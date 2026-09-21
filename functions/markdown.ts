// chaosnexus-website/functions/markdown.ts
/**
 * HTML → Markdown helpers for Accept: text/markdown negotiation on Pages.
 *
 * Pure iterative TypeScript (no Node DOM parsers, no deep recursion) so it
 * stays within Cloudflare Workers CPU/stack limits on large VitePress pages.
 */

/**
 * Whether the Accept header prefers text/markdown over text/html.
 *
 * Matches scanners that send `Accept: text/markdown` and agents that send
 * `text/markdown, text/html;q=0.8`. Browsers sending only HTML stay on HTML.
 */
export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;
  const parts = acceptHeader.split(",").map((raw) => {
    const segments = raw.trim().split(";").map((s) => s.trim());
    const type = (segments[0] ?? "").toLowerCase();
    let q = 1;
    for (const seg of segments.slice(1)) {
      if (seg.startsWith("q=")) {
        const parsed = Number.parseFloat(seg.slice(2));
        if (!Number.isNaN(parsed)) q = parsed;
      }
    }
    return { type, q };
  });

  const markdown = parts
    .filter((p) => p.type === "text/markdown")
    .reduce((best, p) => (best === null || p.q > best ? p.q : best), null as number | null);
  if (markdown === null || markdown <= 0) return false;

  const html = parts
    .filter((p) => p.type === "text/html" || p.type === "application/xhtml+xml")
    .reduce((best, p) => (best === null || p.q > best ? p.q : best), null as number | null);

  if (html === null) return true;
  return markdown >= html;
}

/**
 * Pull title / description / main content from VitePress HTML for cleaner MD.
 */
export function prepareHtmlForMarkdown(html: string): {
  title: string;
  description: string;
  bodyHtml: string;
} {
  const title =
    matchMeta(html, /property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
    matchMeta(html, /content=["']([^"']+)["'][^>]*property=["']og:title["']/i) ||
    matchMeta(html, /<title[^>]*>([^<]*)<\/title>/i) ||
    "";

  const description =
    matchMeta(html, /name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    matchMeta(html, /content=["']([^"']+)["'][^>]*name=["']description["']/i) ||
    matchMeta(html, /property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
    "";

  // Prefer bounded slice around VitePress content markers to avoid huge regexes.
  const bodyHtml = extractMainContent(html);

  return {
    title: decodeEntities(title).trim(),
    description: decodeEntities(description).trim(),
    bodyHtml,
  };
}

/** Convert prepared HTML into markdown with optional YAML frontmatter. */
export function htmlToMarkdown(html: string): string {
  const { title, description, bodyHtml } = prepareHtmlForMarkdown(html);
  const body = convertFragment(bodyHtml).trim();
  const front: string[] = [];
  if (title) front.push(`title: ${yamlEscape(title)}`);
  if (description) front.push(`description: ${yamlEscape(description)}`);
  if (front.length === 0) return body;
  return `---\n${front.join("\n")}\n---\n\n${body}`;
}

/** Rough token estimate (chars/4), matching common agent heuristics. */
export function estimateMarkdownTokens(markdown: string): number {
  return Math.max(1, Math.round(markdown.length / 4));
}

/** Cap converted HTML fragment size to keep Workers CPU bounded. */
const MAX_FRAGMENT_CHARS = 400_000;

function extractMainContent(html: string): string {
  const markers = ['id="VPContent"', 'class="VPDoc', 'class="content"', "<main", "<article"];
  let start = -1;
  for (const marker of markers) {
    const idx = html.indexOf(marker);
    if (idx !== -1) {
      // Walk back to the opening '<' of this tag.
      const tagStart = html.lastIndexOf("<", idx);
      start = tagStart === -1 ? idx : tagStart;
      break;
    }
  }
  if (start === -1) {
    // Fallback: strip head and take a bounded body slice.
    const bodyIdx = html.search(/<body\b/i);
    start = bodyIdx === -1 ? 0 : bodyIdx;
  }
  let fragment = html.slice(start, start + MAX_FRAGMENT_CHARS);
  // Drop obvious chrome blocks without nested regex hell.
  fragment = fragment.replace(/<(script|style|noscript|svg|iframe)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  fragment = fragment.replace(/<!--[\s\S]*?-->/g, "");
  return fragment;
}

/** Lightweight HTML fragment → Markdown (iterative, Workers-safe). */
function convertFragment(html: string): string {
  let s = html.slice(0, MAX_FRAGMENT_CHARS);

  // Fenced code blocks before other transforms.
  s = s.replace(/<pre\b[^>]*>\s*<code\b[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, (_m, code) => {
    const text = decodeEntities(stripTags(String(code))).replace(/\n$/, "");
    return `\n\n\`\`\`\n${text}\n\`\`\`\n\n`;
  });
  s = s.replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, (_m, code) => {
    const text = decodeEntities(stripTags(String(code))).replace(/\n$/, "");
    return `\n\n\`\`\`\n${text}\n\`\`\`\n\n`;
  });

  // Headings (outermost first via multiple non-recursive passes).
  for (let i = 6; i >= 1; i--) {
    const re = new RegExp(`<h${i}\\b[^>]*>([\\s\\S]*?)<\\/h${i}>`, "gi");
    s = s.replace(re, (_m, inner) => `\n\n${"#".repeat(i)} ${flattenInline(String(inner))}\n\n`);
  }

  s = s.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_m, inner) => `\n- ${flattenInline(String(inner))}`);
  s = s.replace(/<\/?(?:ul|ol)\b[^>]*>/gi, "\n");
  s = s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_m, inner) => `\n\n${flattenInline(String(inner))}\n\n`);
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/?(?:div|section|article|main|span|nav|header|footer|aside|button)\b[^>]*>/gi, "");

  s = flattenInline(s);
  s = stripTags(s);
  s = decodeEntities(s);
  s = s.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return s;
}

/** Apply inline markdown transforms with a fixed number of passes (no recursion). */
function flattenInline(html: string): string {
  let s = html;
  for (let pass = 0; pass < 4; pass++) {
    const before = s;
    s = s.replace(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, (_m, inner) => `**${stripTags(String(inner))}**`);
    s = s.replace(/<(?:em|i)\b[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, (_m, inner) => `_${stripTags(String(inner))}_`);
    s = s.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_m, inner) => `\`${decodeEntities(stripTags(String(inner)))}\``);
    s = s.replace(
      /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
      (_m, href, inner) => {
        const text = decodeEntities(stripTags(String(inner))).trim() || String(href);
        return `[${text}](${href})`;
      },
    );
    s = s.replace(
      /<img\b[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*\/?>/gi,
      (_m, alt, src) => `![${alt}](${src})`,
    );
    s = s.replace(
      /<img\b[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi,
      (_m, src, alt) => `![${alt}](${src})`,
    );
    if (s === before) break;
  }
  return s;
}

function stripTags(html: string): string {
  return html.replace(/<\/?[^>]+>/g, "");
}

function matchMeta(html: string, re: RegExp): string {
  const m = html.match(re);
  return m?.[1] ?? "";
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, n) => String.fromCharCode(Number.parseInt(n, 16)));
}

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n") || value.includes('"')) {
    return JSON.stringify(value);
  }
  return value;
}
