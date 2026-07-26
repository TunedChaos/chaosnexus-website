---
title: "Project Status and Next Steps"
description: "Honest alpha-launch status for ChaosNexus"
---

# Project Status and Next Steps

**Updated:** 2026-07-25

ChaosNexus is in an **early public alpha launch** (pre-1.0). The announce is live: docs, Codeberg polyrepos, Hugging Face adapter, and social / blog posts.

## Where we are

| Area | State |
|------|--------|
| Anvil MCP + Rhai sandbox | Usable; some native Rhai registry bindings still incomplete |
| Forge IDE + pending approvals | Usable for plugin review workflows |
| Codex | Usable for docs fetch/index |
| Tuned / Granite 4.1-8B | **ChaosNexus Tuned v1** live on [Hugging Face](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1) (Anvil mean **0.944**, smoke clear); Codex deferred |
| Crucible (LLM interface) | Sessions SSOT + GGUF pull/load (Granite Candle path for Tuned v1); Forge Models tab + supervise |
| Forge Agent Chat | Dock/float/disable; wired to Crucible generate + sessions; Anvil MCP + Skills/Rules sidebars |
| Scripts (Rhai plugins/libs) | Alpha polyrepo; [guide](/guide/chaosnexus-scripts/about) |
| Docs site | Live at [chaosnexus.ai](https://chaosnexus.ai) |
| Public repos | **Codeberg** polyrepos (contribute) → **GitHub** mirrors + Sponsors (see [repository architecture](/REPOSITORY_ARCHITECTURE)) |
| Dev blog / announce | Live on [tunedchaos.dev](https://tunedchaos.dev); LinkedIn company article + personal share; X/Twitter |
| Desktop packaging | CI compile matrix on Forgejo `chaosnexus-release` (`chaosnexus-release-builds.yml` + `tools/deploy/Dockerfile.chaosnexus-release`): Anvil 3-OS binaries; Forge Linux deb/rpm/AppImage/Flatpak + unpublished AUR PKGBUILD drafts. AppImage needs `NO_STRIP=1`. Public Releases / Flathub / AUR still pending |

## Known gaps (active)

1. **Anvil Rhai registry:** fix `register_mcp_tool` / `load_config` (and related) bindings so bundled plugins resolve cleanly.
2. **Packaging:** installers are produced in CI / local Just recipes; Flathub, AUR submission, and public Codeberg/GitHub Releases are still pending.
3. **Inbound contribution runbook:** port Codeberg PRs back into the private monorepo.
4. **Optional:** Open-LLM-style `lm_eval` footnote on the Hub card (Anvil rubric already published).
5. **Optional:** GPU (ROCm/CUDA) path for Crucible Candle generate (CPU Q4 smoke works).

## What to try today

1. Read [What and Why](/guide/what-and-why) and the [security model](/context/security_model).
2. Clone Anvil / Forge from **Codeberg** (not GitHub mirrors).
3. Follow [Quickstart](/guide/quickstart).
4. Load the adapter from [TunedChaos/ChaosNexus_Tuned_v1](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1) if you are wiring local Rhai tooling chat.
5. Report issues on Codeberg; expect delays in responses.

## Support and license

- [Support the project](/guide/support)
- [Licensing (AGPL + commercial)](/guide/licensing)
- [Attributions & third-party licenses](/guide/attributions/)
- [Contribute](/guide/contribute)
