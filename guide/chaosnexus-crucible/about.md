---
title: "About ChaosNexus Crucible"
description: "Local LLM interface for ChaosNexus (Candle / Colibri + MCP toward Anvil)"
---

# About ChaosNexus Crucible

ChaosNexus Crucible is the **local LLM interface** for the ChaosNexus stack. It loads a model through a pluggable inference backend and exposes a small HTTP API for generation. It can also open an MCP client toward ChaosNexus Anvil so a generation request may discover Anvil tools.

::: tip Interface, not weights
Crucible talks to models. It does **not** ship or train model weights. Training and datasets live in **ChaosNexus Tuned**. Published adapters (when ready) go to Hugging Face separately.
:::

## What it is

- A Rust service (Axum) that binds locally (default `127.0.0.1:8080`).
- Backends selected by config: **Candle** (default) or **Colibri**.
- Optional MCP client connection to an Anvil instance when `/generate` includes Anvil port + token.

## What it is not

- Not a desktop chat UI (that belongs in Forge once the LLM bridge lands).
- Not the fine-tuning pipeline (Tuned).
- Not a substitute for Anvil's sandbox; Anvil remains the tool host.

## Status

Early / experimental (alpha). APIs and backends may change. See the [roadmap](/roadmap) M6 checklist.

## Where it lives

- Contribute: [codeberg.org/TunedChaos/chaosnexus-crucible](https://codeberg.org/TunedChaos/chaosnexus-crucible)
- Mirror: [github.com/TunedChaos/chaosnexus-crucible](https://github.com/TunedChaos/chaosnexus-crucible)
- Attributions: [Crucible licenses](/guide/attributions/chaosnexus-crucible)

## Next

- [Getting started](./getting-started)
- [Usage](./usage)
- [Configuration](./configuration)
