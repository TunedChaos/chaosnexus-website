---
title: "Roadmap"
description: "ChaosNexus public roadmap milestones M1-M8"
---

# ChaosNexus Roadmap

Living checklist for the public alpha launch and path to 1.0. Status as of 2026-07-24.

## M1 - Public distribution topology

- [x] AGPL-3.0-or-later + contributor dual-license grant
- [x] Private monorepo SSOT documented (Codeberg contribute primary; GitHub mirrors)
- [x] Alpha-launch polyrepos for Anvil, Forge, website, Codex, and Crucible (Codeberg + GitHub)
- [x] Scripts polyrepo created (`chaosnexus-scripts`)
- [x] Tuned polyrepo created (`chaosnexus-tuned`)
- [x] Alpha-launch repos set **public** for anonymous clone/browse
- [x] Automated monorepo → Codeberg subtree sync fully enabled (`codeberg-sync.yml`)
- [x] Codeberg → GitHub mirrors for published pieces + Sponsors / FUNDING.yml

## M2 - Human-in-the-loop Forge IDE

- [x] Pending plugin quarantine and approval UX
- [x] Vhai visual scripting canvas (core)
- [ ] Local LLM chat bridge to fine-tuned Granite
- [ ] Packaged desktop releases (Linux first)

## M3 - Anvil sandbox layers

- [x] Rhai memory sandbox + host default-deny permissions
- [x] Egress allowlists, shell argv gating, bwrap, hop limits
- [ ] Close remaining Rhai native registry gaps (`register_mcp_tool`, `load_config` bindings)
- [ ] External security review of the six-layer model

## M4 - Codex local context

- [x] Fetch/index MCP + CLI
- [x] Alpha-launch docs and getting-started for Codeberg-first installs
- [ ] Broader library catalog defaults

## M5 - Tuned / Granite

- [x] Dataset generators and eval harness
- [x] Granite 4.1-8B fine-tune complete and evaluated (ChaosNexus Tuned v1, Anvil mean 0.944)
- [x] Hugging Face model card + weights publish ([ChaosNexus_Tuned_v1](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1))
- [x] Documented &lt;6GB VRAM consumer path
- [x] Alpha announce live (docs, Hub, Codeberg, blog / LinkedIn)

## M6 - Crucible (local LLM interface)

- [x] Candle / Colibri inference scaffold
- [x] Alpha-launch polyrepo on Codeberg + GitHub mirror
- [ ] Stable MCP integration with Anvil
- [ ] Packaged local chat path in Forge (bridges to fine-tuned Granite)

## M7 - Community and licensing

- [x] Alpha-launch docs: licensing, support, contribution topology, AI assistance disclosure
- [x] CODE_OF_CONDUCT shipped in component trees
- [ ] Commercial license one-pager / terms
- [ ] Codeberg issue templates
- [ ] First `v0.1.0-alpha` tags on Codeberg

## M8 - 1.0 readiness

- [ ] Stable config schema and migration notes
- [ ] Full E2E coverage for Forge interactables
- [ ] Security disclosure process exercised end-to-end
- [ ] Polyrepo sync hardened (inbound PR porting runbook)
- [x] Docs site live on chaosnexus.ai (Cloudflare Pages; production history pruned)
