---
title: "ChaosNexus Crucible Configuration"
description: "crucible.toml fields and defaults"
---

# ChaosNexus Crucible Configuration

Crucible reads **`crucible.toml`** from the process working directory. If the file is missing, built-in defaults are used.

## Example

```toml
# crucible.toml
backend = "candle"                 # "candle" (default) or "colibri"
model_path = "models/granite-4.1-8b"
port = 8080
```

## Fields

| Field | Default | Notes |
|-------|---------|--------|
| `backend` | `candle` | Selects Candle vs Colibri inference implementation |
| `model_path` | `models/granite-4.1-8b` | Path passed to backend initialize |
| `port` | `8080` | Local HTTP bind port (`127.0.0.1`) |

Invalid TOML falls back to defaults.

## Generation request params

These are not in `crucible.toml`; they are per-request on `POST /generate`:

| JSON field | Typical default (engine) |
|------------|---------------------------|
| `max_new_tokens` | `128` |
| `temperature` | `0.7` |
| `top_p` | `0.95` |
| `top_k` | `40` |
| `anvil_port` / `anvil_token` | omitted (no MCP connect) |

See [Usage](./usage).
