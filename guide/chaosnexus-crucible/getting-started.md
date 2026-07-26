---
title: "Getting Started with ChaosNexus Crucible"
description: "Build and run the local LLM interface"
---

# Getting Started with ChaosNexus Crucible

## Prerequisites

- **Rust** toolchain (edition matching the crate; see `Cargo.toml`)
- Enough disk / VRAM for the model you point `model_path` at
- Optional: a running ChaosNexus Anvil if you want MCP tool discovery from `/generate`

## Clone and build

Prefer Codeberg as the contribute primary:

```bash
git clone https://codeberg.org/TunedChaos/chaosnexus-crucible.git
cd chaosnexus-crucible
cargo build --release
```

In the ChaosNexus monorepo the same tree is `chaosnexus-crucible/`.

## Configure

Create `crucible.toml` in the working directory (optional; defaults apply if missing):

```toml
backend = "candle"
model_path = "models/granite-4.1-8b"
port = 8080
```

See [Configuration](./configuration) for field details.

## Run

```bash
cargo run --release
# or
./target/release/chaosnexus-crucible
```

You should see a bind line for `127.0.0.1:<port>`. Check health:

```bash
curl -s http://127.0.0.1:8080/health
```

## Next

- [Usage](./usage) for `/generate` and Anvil MCP options
- [About](./about) for role vs Tuned / Anvil
