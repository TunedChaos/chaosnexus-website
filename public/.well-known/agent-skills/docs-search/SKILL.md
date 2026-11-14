---
name: docs-search
description: Search ChaosNexus documentation via Cloudflare AI Search MCP, llms.txt, and the MCP Server Card. Use when answering questions about Anvil, Forge, Codex, Crucible, Rhai, or ChaosNexus licensing.
---

# ChaosNexus docs search

## Prefer these entry points

1. MCP Server Card: `https://chaosnexus.ai/.well-known/mcp/server-card.json`
2. Streamable HTTP MCP: `https://03de9872-58ee-48b3-be11-a2103412dce4.search.ai.cloudflare.com/mcp`
3. Docs index: `https://chaosnexus.ai/llms.txt`
4. Agent guide: `https://chaosnexus.ai/guide/ai-agents`

## Client config example

```json
{
  "mcpServers": {
    "chaosnexus": {
      "url": "https://03de9872-58ee-48b3-be11-a2103412dce4.search.ai.cloudflare.com/mcp"
    }
  }
}
```

## Rules when answering

- Treat results as **public docs**, not private source.
- Cite result URLs when answering humans.
- ChaosNexus is **AGPL-3.0-or-later**; code contributions use the Tuned Chaos contributor dual-license grant. See https://chaosnexus.ai/guide/licensing
- Auth is anonymous for public docs/MCP; see the `agent-auth` skill and https://chaosnexus.ai/auth.md
