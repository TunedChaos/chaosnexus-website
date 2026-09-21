---
title: "Project Status and Next Steps"
description: "Honest alpha-launch status for ChaosNexus"
---

# Project Status and Next Steps

**Updated:** 2026-08-05

ChaosNexus is in an **early public alpha launch** (pre-1.0). The announce is live: docs, GitHub repositories, Hugging Face adapter, and social / blog posts.

**Docs agents (2026-08-05):** Cloudflare AI Search (`chaosnexus`) public MCP + on-site search modal; `/llms.txt` linked; `/guide/ai-agents` and `/guide/privacy`. Origin `robots.txt` allows crawlers (Cloudflare managed prepend may still Disallow some training bots).

**Status pass (2026-08-05):** Anvil Rhai live registry verified/fixed (`register_mcp_tool` / `load_config`, plus `translate` / `log_*` overloads and replaceable global native context). Config inheritance tests added. Inbound GitHub PR runbook shipped. Suite publish gate `SUITE_PUBLISH=1` set on CI; empty `chaosnexus-suite` remotes still need creation (see Known gaps).

**Toolchain (2026-08-01):** Full latest-everywhere dependency refresh across pnpm, all Cargo roots (plus local `rhai-*` / vendored `rhai-ml`), Tuned `uv` lock, and CI pins (Node 24, pnpm 11.18, Just 1.57, CI runner 12.13.2). See [Active Context](/context/active_context) for residual pins (logos/rowan, `bincode`/`smartcore`, TypeScript 6).

**Testing (2026-08-01):** Tiered matrix via root `just test-unit` / `just test-e2e` / `just test-website-smoke` / `just test`. CI workflow `.ci/workflows/chaosnexus-tests.yml` runs unit on every PR/push; Playwright Forge E2E + website smoke on `main` / manual. Details in [Active Context](/context/active_context).

## Where we are

| Area | State |
|------|--------|
| Anvil MCP + Rhai sandbox | Usable; live `register_mcp_tool` / `load_config` verified (Forge terminal fixture) |
| Forge IDE + pending approvals | Usable for plugin review workflows |
| Codex | Usable for docs fetch/index |
| Tuned / Granite 4.1-8B | **ChaosNexus Tuned v1** live on [Hugging Face](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1) (Anvil mean **0.944**, smoke clear); Codex deferred |
| Crucible (LLM interface) | Sessions SSOT + GGUF pull/load (Granite Candle path for Tuned v1); Forge Models tab + supervise |
| Forge Agent Chat | Dock/float/disable; wired to Crucible generate + sessions; Anvil MCP + Skills/Rules sidebars |
| Scripts (Rhai plugins/libs) | Slim polyrepo: `translation_test` example + `lib/`; [guide](/guide/chaosnexus-scripts/about) |
| Suite packaging | workspace `chaosnexus-suite/` recipes; CI artifacts; **public `suite-v*` Releases wait on GitHub remotes** (`SUITE_PUBLISH=1` set) |
| Docs site | Live at [chaosnexus.ai](https://chaosnexus.ai); Quickstart leads with Suite downloads; AI Search MCP + llms.txt for agents ([AI agents](/guide/ai-agents)) |
| Automated tests | Unit always in CI; Forge Playwright + website smoke on main/manual; Tuned pytest for pipeline utils |
| Public repos | **GitHub** public repositories + Sponsors (see [repository architecture](/REPOSITORY_ARCHITECTURE)) |
| Dev blog / announce | Live on [tunedchaos.dev](https://tunedchaos.dev); LinkedIn company article + personal share; X/Twitter |
| Desktop packaging | CI compile matrix on CI `chaosnexus-release`: Anvil 3-OS; Forge Linux bundles; Suite AppImage/zip/.app. AppImage needs `NO_STRIP=1`. Flathub / AUR / signing still pending |

## Known gaps (active)

1. **Suite Remotes:** GitHub `TunedChaos/chaosnexus-suite` exists (subtree bootstrapped). Then dispatch `chaosnexus-release-builds.yml` for `suite-v0.8.5` artifacts (`SUITE_PUBLISH=1`).
2. **Optional:** disable Cloudflare managed robots.txt training Disallows for full AI crawler allow (origin already Allow + Sitemap).
3. **Optional:** Open-LLM-style `lm_eval` footnote on the Hub card (Anvil rubric already published).
4. **Optional:** GPU (ROCm/CUDA) path for Crucible Candle generate (CPU Q4 smoke works).
5. **Optional:** Real Tauri desktop E2E (beyond `MOCK_TAURI` browser Playwright); Monaco 0.56 migration (currently pinned 0.55.1).
6. **Optional:** Goose vs custom agent passthrough decision.

## What to try today

1. Read [What and Why](/guide/what-and-why) and the [security model](/context/security_model).
2. Prefer [Quickstart](/guide/quickstart) Suite downloads when Releases exist; otherwise clone Anvil / Forge from **GitHub**.
3. Follow [Quickstart](/guide/quickstart).
4. Load the adapter from [TunedChaos/ChaosNexus_Tuned_v1](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1) if you are wiring local Rhai tooling chat.
5. Report issues on GitHub; expect delays in responses.

## Support and license

- [Support the project](/guide/support)
- [Licensing (AGPL + commercial)](/guide/licensing)
- [Attributions & third-party licenses](/guide/attributions/)
- [Contribute](/guide/contribute)
