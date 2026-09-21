---
title: "Privacy"
description: "How ChaosNexus documentation handles visitor data and third-party services"
---

# Privacy

Last updated: 2026-08-05

This page covers the **ChaosNexus documentation site** at [chaosnexus.ai](https://chaosnexus.ai). The desktop products (Anvil, Forge, Codex, Crucible) are local-first; their privacy posture is defined by what you run on your own machines and is not the same as this public docs site.

## What this site stores

The documentation site is static content hosted on **Cloudflare Pages**. Tuned Chaos does not run a custom application database for docs visitors.

Server and CDN logs (IP address, user agent, request path, timing) may be processed by Cloudflare as part of delivering the site. See [Cloudflare’s privacy policy](https://www.cloudflare.com/privacypolicy/).

## Search and AI agents (Cloudflare AI Search)

Optional **natural-language search** on this site (UI search modal and the public MCP / search endpoints) is powered by **Cloudflare AI Search**.

| Topic | Detail |
|-------|--------|
| Role | Cloudflare acts as a **data processor** for search/query traffic |
| What is sent | The text of your search or chat query (and related retrieval request metadata) |
| What is indexed | Public documentation pages already published on chaosnexus.ai (crawled from the site sitemap) |
| What is not indexed by design | Large third-party license dump pages under `/guide/attributions/` may be excluded from the search index to keep results high-signal |
| Auth | Public search/MCP endpoints do not require a Tuned Chaos account |

Do not paste secrets, credentials, or private source into the docs search box or MCP search tool. The indexed corpus is public documentation only.

Machine-readable docs without going through AI Search: [`/llms.txt`](/llms.txt) and [`/llms-full.txt`](/llms-full.txt). Agent setup: [AI agents](/guide/ai-agents).

## Licensing of documentation content

Documentation and site content are part of the ChaosNexus open-source project under **AGPL-3.0-or-later**. Code contributions use Tuned Chaos’s **contributor dual-license grant**. See [Licensing](/guide/licensing).

## Contact

Privacy questions: **privacy@tunedchaos.com** (or commercial@tunedchaos.com if your question is about a commercial license).

Security findings: follow [SECURITY](/SECURITY) / email **security@tnd.cx**.
