---
title: "Contribute"
description: "Where and how to contribute to ChaosNexus"
---

# Contribute

## Where to contribute

| Platform | Role |
|----------|------|
| **[GitHub / TunedChaos](https://github.com/TunedChaos)** | **Primary public host** — open issues and pull requests here |
| [GitHub Sponsors](https://github.com/sponsors/TunedChaos) | Support the project |

Full topology: [Repository architecture](/REPOSITORY_ARCHITECTURE).

## Public repositories (alpha launch)

Contribute against these **public** GitHub repositories:

- [chaosnexus-anvil](https://github.com/TunedChaos/chaosnexus-anvil)
- [chaosnexus-forge](https://github.com/TunedChaos/chaosnexus-forge)
- [chaosnexus-website](https://github.com/TunedChaos/chaosnexus-website)
- [chaosnexus-codex](https://github.com/TunedChaos/chaosnexus-codex)
- [chaosnexus-crucible](https://github.com/TunedChaos/chaosnexus-crucible) — local LLM **interface** (not model weights). Docs: [About Crucible](/guide/chaosnexus-crucible/about)
- [chaosnexus-scripts](https://github.com/TunedChaos/chaosnexus-scripts) — shared Rhai plugins/libs. Docs: [About Scripts](/guide/chaosnexus-scripts/about)
- [chaosnexus-tuned](https://github.com/TunedChaos/chaosnexus-tuned) — dataset generation, eval, and fine-tuning pipeline (weights stay out of git; adapter on [Hugging Face](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1))
- [chaosnexus-suite](https://github.com/TunedChaos/chaosnexus-suite) — Suite packaging and Release landing

Model weights: [TunedChaos/ChaosNexus_Tuned_v1](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1) (PEFT / LoRA on Granite 4.1-8B).

## Ground rules

1. Read [SECURITY.md](/SECURITY) / component `SECURITY.md` before filing security findings (email **security@tnd.cx** for undisclosed issues).
2. Accept the dual-license contributor grant in each repo's `CONTRIBUTING.md`.
3. Read the [AI assistance disclosure](/guide/ai-assistance). If you use generative tools in a PR, disclose that you used AI assistance and keep diffs reviewable.
4. Prefer small, focused PRs with semantic commit messages.
5. Expect delays in responses; GitHub issues are the right inbox.

## AI agents indexing docs

Agents should start at [AI agents](/guide/ai-agents) (`/llms.txt`, optional Cloudflare AI Search MCP). Documentation is AGPL-3.0-or-later; see [Licensing](/guide/licensing) and [Privacy](/guide/privacy).

## Dev blog

News: [tunedchaos.dev](https://tunedchaos.dev)
