---
title: "About ChaosNexus Crucible"
description: "Local LLM interface for ChaosNexus (Candle / Colibri + MCP toward Anvil)"
---

# About ChaosNexus Crucible

ChaosNexus Crucible is the **local LLM interface** for the ChaosNexus stack. It loads a model through a pluggable inference backend and exposes a small HTTP API for generation. It can also open an MCP client toward ChaosNexus Anvil so a generation request may discover Anvil tools.

::: tip Interface, not weights
Crucible talks to models. It does **not** ship or train model weights. Training and datasets live in **ChaosNexus Tuned**. The **default download** is the published GGUF [`TunedChaos/ChaosNexus_Tuned_v1-GGUF`](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1-GGUF), cached under `~/.chaosnexus/crucible/models`. The PEFT adapter remains at [`TunedChaos/ChaosNexus_Tuned_v1`](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1).
:::

## Privacy (Hugging Face)

When you set a Hugging Face token in Forge Settings → Models, Forge stores it locally in app `settings.toml` and injects it as `HF_TOKEN` into the Crucible process only. Pull/download requests go to Hugging Face Hub. Tuned Chaos does not receive that token or your model traffic.

## What it is

- A Rust service (Axum) that binds locally (default `127.0.0.1:8080`).
- Backends selected by config: **Candle** (default, GGUF) or **Colibri**.
- Optional MCP client connection to an Anvil instance when `/generate` includes Anvil port + token.
- Model HTTP API: `/models/status`, `/models/pull`, `/models/list`.

## What it is not

- Not a desktop chat UI (Forge Agent Chat + Models settings own that).
- Not the fine-tuning pipeline (Tuned).
- Not a substitute for Anvil's sandbox; Anvil remains the tool host.

## Status

Alpha. Default path is Tuned v1 GGUF via Candle. See the [roadmap](/roadmap) M6 checklist.

## Where it lives

- Contribute: [codeberg.org/TunedChaos/chaosnexus-crucible](https://codeberg.org/TunedChaos/chaosnexus-crucible)
- Mirror: [github.com/TunedChaos/chaosnexus-crucible](https://github.com/TunedChaos/chaosnexus-crucible)
- License: AGPL-3.0-or-later ([Licensing](/guide/licensing))
- Attributions: [Crucible licenses](/guide/attributions/chaosnexus-crucible)

## Next

- [Getting started](./getting-started)
- [Usage](./usage)
- [Configuration](./configuration)
