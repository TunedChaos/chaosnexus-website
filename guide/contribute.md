---
title: "Contribute"
description: "Where and how to contribute to ChaosNexus"
---

# Contribute

## Where to contribute

| Platform | Role |
|----------|------|
| **[Codeberg / TunedChaos](https://codeberg.org/TunedChaos)** | **Primary** - open issues and pull requests here |
| [GitHub / TunedChaos](https://github.com/TunedChaos) | Read-only mirrors + Sponsors; do not open feature PRs here |

Full topology: [Repository architecture](/REPOSITORY_ARCHITECTURE).

## Public repositories (alpha launch)

These are published as a single orphan initial commit each (announce-day snapshot). They must be set **public** on Codeberg and GitHub for clone/browse links to resolve for visitors:

- [chaosnexus-anvil](https://codeberg.org/TunedChaos/chaosnexus-anvil) ([GitHub mirror](https://github.com/TunedChaos/chaosnexus-anvil))
- [chaosnexus-forge](https://codeberg.org/TunedChaos/chaosnexus-forge) ([GitHub mirror](https://github.com/TunedChaos/chaosnexus-forge))
- [chaosnexus-website](https://codeberg.org/TunedChaos/chaosnexus-website) ([GitHub mirror](https://github.com/TunedChaos/chaosnexus-website))
- [chaosnexus-codex](https://codeberg.org/TunedChaos/chaosnexus-codex) ([GitHub mirror](https://github.com/TunedChaos/chaosnexus-codex))
- [chaosnexus-crucible](https://codeberg.org/TunedChaos/chaosnexus-crucible) ([GitHub mirror](https://github.com/TunedChaos/chaosnexus-crucible)) - local LLM **interface** (not model weights). Docs: [About Crucible](/guide/chaosnexus-crucible/about)
- [chaosnexus-scripts](https://codeberg.org/TunedChaos/chaosnexus-scripts) ([GitHub mirror](https://github.com/TunedChaos/chaosnexus-scripts)) - shared Rhai plugins/libs. Docs: [About Scripts](/guide/chaosnexus-scripts/about)
- [chaosnexus-tuned](https://codeberg.org/TunedChaos/chaosnexus-tuned) ([GitHub mirror](https://github.com/TunedChaos/chaosnexus-tuned)) - dataset generation, eval, and fine-tuning pipeline (weights stay out of git; adapter on [Hugging Face](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1))

Model weights: [TunedChaos/ChaosNexus_Tuned_v1](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1) (PEFT / LoRA on Granite 4.1-8B).

## Ground rules

1. Read [SECURITY.md](/SECURITY) / component `SECURITY.md` before filing security findings (email **security@tnd.cx** for undisclosed issues).
2. Accept the dual-license contributor grant in each repo's `CONTRIBUTING.md`.
3. Read the [AI assistance disclosure](/guide/ai-assistance). If you use generative tools in a PR, disclose that you used AI assistance and keep diffs reviewable.
4. Prefer small, focused PRs with semantic commit messages.
5. Expect delays in responses; Codeberg issues are still the right inbox.

## Dev blog

News: [tunedchaos.dev](https://tunedchaos.dev)
