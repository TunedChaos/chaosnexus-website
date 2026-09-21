// chaosnexus-website/functions/_middleware.ts
/**
 * Cloudflare Pages middleware: Markdown for Agents content negotiation.
 *
 * When Accept prefers text/markdown, convert HTML page responses to markdown
 * (Content-Type: text/markdown) with x-markdown-tokens. HTML remains default.
 *
 * Native Cloudflare zone setting `content_converter` needs Pro+; this origin
 * function covers Free (and works alongside native conversion if enabled later).
 */

import {
  estimateMarkdownTokens,
  htmlToMarkdown,
  prefersMarkdown,
} from "./markdown";

/** Max origin HTML size we will convert (align with CF Markdown for Agents 2 MiB). */
const MAX_HTML_BYTES = 2_097_152;

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}): Promise<Response> {
  const accept = context.request.headers.get("Accept");
  if (!prefersMarkdown(accept)) {
    return context.next();
  }

  let response: Response;
  try {
    response = await context.next();
  } catch (err) {
    // Fail open: never break HTML serving if static fetch throws.
    return new Response(`Markdown middleware upstream error: ${String(err)}`, {
      status: 502,
    });
  }

  const contentType = response.headers.get("Content-Type") ?? "";
  if (!response.ok || !contentType.toLowerCase().includes("text/html")) {
    return response;
  }

  const lengthHeader = response.headers.get("Content-Length");
  if (lengthHeader) {
    const len = Number.parseInt(lengthHeader, 10);
    if (!Number.isNaN(len) && len > MAX_HTML_BYTES) {
      return response;
    }
  }

  try {
    const html = await response.text();
    if (html.length > MAX_HTML_BYTES) {
      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }

    try {
      const markdown = htmlToMarkdown(html);
      const tokens = estimateMarkdownTokens(markdown);

      const headers = new Headers(response.headers);
      headers.set("Content-Type", "text/markdown; charset=utf-8");
      headers.set("x-markdown-tokens", String(tokens));
      const vary = headers.get("Vary");
      if (!vary) {
        headers.set("Vary", "Accept");
      } else if (!/\bAccept\b/i.test(vary)) {
        headers.set("Vary", `${vary}, Accept`);
      }
      headers.delete("Content-Length");
      headers.delete("Content-Encoding");
      headers.delete("ETag");
      headers.delete("Last-Modified");

      return new Response(markdown, {
        status: 200,
        statusText: "OK",
        headers,
      });
    } catch {
      // Conversion failed: return original HTML rather than Worker 1101.
      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }
  } catch (err) {
    return new Response(`Markdown middleware read error: ${String(err)}`, {
      status: 502,
    });
  }
}
