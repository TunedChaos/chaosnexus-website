---
title: "Project Status and Next Steps"
description: "Honest alpha-launch status for ChaosNexus"
---

# Project Status and Next Steps

**Updated:** 2026-07-24

ChaosNexus is in an **early public alpha launch** (pre-1.0). The announce is live: docs, Codeberg polyrepos, Hugging Face adapter, and social / blog posts.

## Where we are

| Area | State |
|------|--------|
| Anvil MCP + Rhai sandbox | Usable; some native Rhai registry bindings still incomplete |
| Forge IDE + pending approvals | Usable for plugin review workflows |
| Codex | Usable for docs fetch/index |
| Tuned / Granite 4.1-8B | **ChaosNexus Tuned v1** live on [Hugging Face](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1) (Anvil mean **0.944**, smoke clear); Codex deferred |
| Crucible (LLM interface) | Experimental alpha; [guide](/guide/chaosnexus-crucible/about) |
| Scripts (Rhai plugins/libs) | Alpha polyrepo; [guide](/guide/chaosnexus-scripts/about) |
| Docs site | Live at [chaosnexus.ai](https://chaosnexus.ai) |
| Public repos | **Codeberg** polyrepos (contribute) → **GitHub** mirrors + Sponsors (see [repository architecture](/REPOSITORY_ARCHITECTURE)) |
| Dev blog / announce | Live on [tunedchaos.dev](https://tunedchaos.dev); LinkedIn company article + personal share |

## Known gaps (active)

1. **Anvil Rhai registry:** fix `register_mcp_tool` / `load_config` (and related) bindings so bundled plugins resolve cleanly.
2. **Forge local LLM bridge:** connect AgentChatUI to ChaosNexus Tuned v1 locally.
3. **Packaging:** first desktop release artifacts for Linux (then macOS / Windows).
4. **Inbound contribution runbook:** port Codeberg PRs back into the private monorepo.
5. **Optional:** Open-LLM-style `lm_eval` footnote on the Hub card (Anvil rubric already published).

## What to try today

1. Read [What and Why](/guide/what-and-why) and the [security model](/context/security_model).
2. Clone Anvil / Forge from **Codeberg** (not GitHub mirrors).
3. Follow [Quickstart](/guide/quickstart).
4. Load the adapter from [TunedChaos/ChaosNexus_Tuned_v1](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1) if you are wiring local Rhai tooling chat.
5. Report issues on Codeberg; expect delays in responses.

## Support and license

- [Support the project](/guide/support)
- [Licensing (AGPL + commercial)](/guide/licensing)
- [Contribute](/guide/contribute)
