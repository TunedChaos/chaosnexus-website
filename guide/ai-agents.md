---
title: "AI agents"
description: "How AI agents should discover and search ChaosNexus documentation"
---

# AI agents

Last updated: 2026-08-05

ChaosNexus documentation is intentionally open to AI crawlers and agents. The software and docs are **AGPL-3.0-or-later**. Code contributions require accepting the **contributor dual-license grant** in each repo’s `CONTRIBUTING.md`. See [Licensing](/guide/licensing).

## Prefer these entry points

| Resource | URL | Use when |
|----------|-----|----------|
| Docs index for LLMs | [`/llms.txt`](/llms.txt) | Discovering pages before deep reads |
| Full docs dump | [`/llms-full.txt`](/llms-full.txt) | Offline / bulk context (large) |
| Sitemap | [`/sitemap.xml`](/sitemap.xml) | Crawl planning |
| Licensing | [`/guide/licensing`](/guide/licensing) | License and contributor grant |
| Privacy (search) | [`/guide/privacy`](/guide/privacy) | What Cloudflare AI Search processes |
| Agent auth | [`https://chaosnexus.ai/auth.md`](https://chaosnexus.ai/auth.md) | OAuth/OIDC discovery + anonymous public access |

`robots.txt` allows general and AI crawlers and points at the sitemap.

Homepage HTTP responses also advertise discovery via RFC 8288 `Link` headers (for example `api-catalog`, `describedby` → `/llms.txt` and `/.well-known/agent-index.json`, `service-doc` → Rhai API / AI agents). The API catalog lives at `https://chaosnexus.ai/.well-known/api-catalog` (RFC 9727 linkset).

## OAuth / OIDC discovery

Public docs and the AI Search MCP are **anonymous** today (no Bearer token). Discovery metadata is published so agents can find that policy programmatically:

| Document | URL |
|----------|-----|
| OAuth AS metadata (RFC 8414) | https://chaosnexus.ai/.well-known/oauth-authorization-server |
| OpenID Connect Discovery | https://chaosnexus.ai/.well-known/openid-configuration |
| Protected Resource Metadata (RFC 9728) | https://chaosnexus.ai/.well-known/oauth-protected-resource |
| Agent auth notes | https://chaosnexus.ai/auth.md |

Issuer: `https://chaosnexus.ai`. Token/authorize/register endpoints exist as stubs that direct clients to anonymous access until protected commercial APIs ship.

## Web Bot Auth

ChaosNexus publishes an HTTP Message Signatures key directory so outbound bot/agent clients can identify as this origin ([IETF WebBotAuth](https://datatracker.ietf.org/wg/webbotauth/about/), [Cloudflare Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)):

| Item | Value |
|------|-------|
| Key directory | https://chaosnexus.ai/.well-known/http-message-signatures-directory |
| Media type | `application/http-message-signatures-directory+json` |
| `Signature-Agent` | `"https://chaosnexus.ai"` (quoted structured string) |

Signed requests SHOULD include `Signature-Agent`, `Signature-Input`, and `Signature` with `tag="web-bot-auth"`. Rotate keys with `tools/launch/generate-chaosnexus-web-bot-auth.py` (private key stays local under `chaosnexus-website/.web-bot-auth/`, gitignored).

## WebMCP (browser tools)

ChaosNexus registers [WebMCP](https://webmachinelearning.github.io/webmcp/) tools on page load via `navigator.modelContext.registerTool()` / `document.modelContext.registerTool()` (polyfill: `@mcp-b/webmcp-polyfill`). Agents in a supporting browser can call:

| Tool | Purpose |
|------|---------|
| `search_docs` | Hybrid search over public docs (AI Search `/search`) |
| `navigate_to` | Client-side navigation to a same-origin docs path |
| `get_discovery_info` | Agent discovery URLs (MCP card, skills index, auth, etc.) |
| `get_current_page` | Current URL, title, and description |

Implementation: `chaosnexus-website/.vitepress/webmcp.ts` (wired from the VitePress theme).

## Agent Skills discovery

Published skills are listed at `https://chaosnexus.ai/.well-known/agent-skills/index.json` ([Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc) v0.2.0). Each entry includes `name`, `type`, `description`, `url`, and a `sha256:` digest of the artifact.

| Skill | Purpose |
|-------|---------|
| `agent-auth` | Auth.md + OAuth/OIDC discovery for this site |
| `docs-search` | Docs MCP, llms.txt, and search guidance |

## DNS-AID (DNS for AI Discovery)

Agents can discover ChaosNexus endpoints via [DNS-AID](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/) ServiceMode `HTTPS` / `SVCB` records ([RFC 9460](https://www.rfc-editor.org/rfc/rfc9460)) under `_agents.chaosnexus.ai`:

| Name | Type | Role |
|------|------|------|
| `_index._agents.chaosnexus.ai` | HTTPS (+ TXT fallback) | Org agent index entrypoint → `chaosnexus.ai` |
| `_mcp._agents.chaosnexus.ai` | HTTPS | MCP protocol entrypoint → docs AI Search host |
| `_docs-search._mcp._agents.chaosnexus.ai` | SVCB | Named docs-search MCP agent |

HTTP mirrors (after zone DNS is published, prefer DNS + DNSSEC):

- [`/.well-known/agent-index.json`](https://chaosnexus.ai/.well-known/agent-index.json)
- [`/.well-known/agent-card.json`](https://chaosnexus.ai/.well-known/agent-card.json)

Ops: `tools/launch/provision-chaosnexus-dns-aid.sh` (Cloudflare Zone DNS Edit on `chaosnexus.ai`). **DNSSEC is active**: Cloudflare signs the zone; the DS is published at registrar **Spaceship** (key tag `2371`, algorithm `13`, digest type `2`). isitagentready reports `dnsAid` pass with `dnssecValidated: true`.

## Markdown for Agents (`Accept: text/markdown`)

HTML remains the default for browsers. Agents that send `Accept: text/markdown` receive a markdown rendering of the same URL with:

- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept`
- `x-markdown-tokens` (estimated token count)

Implemented as a Cloudflare Pages Function (`chaosnexus-website/functions/_middleware.ts`) so it works on the Free plan. If the zone is upgraded to Pro+, native edge conversion can also be enabled with `tools/launch/provision-chaosnexus-markdown-for-agents.sh` (`content_converter`).

```bash
curl -sS -H 'Accept: text/markdown' https://chaosnexus.ai/guide/ai-agents | head
```

## Cloudflare AI Search (MCP)

Public documentation is indexed by **Cloudflare AI Search** (instance `chaosnexus`). Agents can call the built-in MCP `search` tool:

```text
https://03de9872-58ee-48b3-be11-a2103412dce4.search.ai.cloudflare.com/mcp
```

Pre-connection discovery uses an [MCP Server Card](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127) at `https://chaosnexus.ai/.well-known/mcp/server-card.json` (`serverInfo`, Streamable HTTP transport endpoint, capabilities).

Example MCP client config:

```json
{
  "mcpServers": {
    "chaosnexus": {
      "url": "https://03de9872-58ee-48b3-be11-a2103412dce4.search.ai.cloudflare.com/mcp"
    }
  }
}
```

When you search:

1. Treat results as **public docs**, not private source.
2. Cite result URLs when answering humans.
3. Remind users that ChaosNexus is **AGPL-3.0-or-later** and that contributions use the dual-license grant; commercial embedding without AGPL obligations needs a commercial license ([Licensing](/guide/licensing)).

Human visitors can also use the on-site AI Search modal (Cmd/Ctrl+K when enabled). Local VitePress keyword search remains available as a fallback.

## Contribute

Issues and PRs: [Contribute](/guide/contribute) on GitHub. Open feature PRs on the public GitHub repositories.
