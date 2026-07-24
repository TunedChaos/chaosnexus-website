---
title: "Using ChaosNexus Crucible"
description: "HTTP generate API and optional Anvil MCP client"
---

# Using ChaosNexus Crucible

Crucible exposes two HTTP routes on the configured port (default `8080`):

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/health` | Liveness string |
| `POST` | `/generate` | Run inference; optional Anvil MCP connect |

## Generate

`POST /generate` accepts JSON. Required field: `prompt`. Optional generation params flatten into the body:

```bash
curl -s http://127.0.0.1:8080/generate \
  -H 'content-type: application/json' \
  -d '{
    "prompt": "Write a safe Rhai plugin skeleton for a time tool.",
    "max_new_tokens": 128,
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 40
  }'
```

Response shape:

```json
{ "result": "..." }
```

## Optional Anvil MCP

If you pass both `anvil_port` and `anvil_token`, Crucible initializes an MCP client to that Anvil instance (when the port changes), lists tools, and logs them. Generation still runs through the selected inference backend.

```bash
curl -s http://127.0.0.1:8080/generate \
  -H 'content-type: application/json' \
  -d '{
    "prompt": "List available Anvil capabilities for plugin authors.",
    "anvil_port": 3000,
    "anvil_token": "YOUR_TOKEN"
  }'
```

Exact Anvil listen / token setup depends on your Anvil host configuration. Failures to connect or list tools are logged; they do not replace a failed generate with a success.

## Backends

| Config `backend` | Role |
|------------------|------|
| `candle` (default) | Hugging Face Candle stack |
| `colibri` | Colibri backend path |

Switch via [`crucible.toml`](./configuration).

## Related

- Forge local LLM chat bridge (roadmap) will sit in front of this interface.
- Tuned produces the weights Crucible loads; do not confuse the two repos.
