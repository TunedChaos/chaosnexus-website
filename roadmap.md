---
title: "Roadmap"
description: "ChaosNexus public roadmap milestones M1-M8"
---

# ChaosNexus Roadmap

Living checklist for the public alpha launch and path to 1.0. Status as of 2026-07-24.

## M1 - Public distribution topology

- [x] AGPL-3.0-or-later + contributor dual-license grant
- [x] sibling component checkouts documented (GitHub public host)
- [x] Alpha-launch public repos for Anvil, Forge, website, Codex, and Crucible on GitHub
- [x] Scripts polyrepo created (`chaosnexus-scripts`)
- [x] Tuned polyrepo created (`chaosnexus-tuned`)
- [x] Alpha-launch repos set **public** for anonymous clone/browse
- [x] Automated workspace → GitHub public sync enabled
- [x] GitHub public hosting for published pieces + Sponsors / FUNDING.yml

## M2 - Human-in-the-loop Forge IDE

- [x] Pending plugin quarantine and approval UX
- [x] Vhai visual scripting canvas (core)
- [x] Local LLM chat bridge to fine-tuned Granite (Crucible + Forge Agent Chat / Models)
- [ ] Packaged desktop releases (Linux first; Suite `suite-v*` when remotes exist)

## M3 - Anvil sandbox layers

- [x] Rhai memory sandbox + host default-deny permissions
- [x] Egress allowlists, shell argv gating, bwrap, hop limits
- [x] Close remaining Rhai native registry gaps (`register_mcp_tool`, `load_config` bindings)
- [ ] External security review of the six-layer model

## M4 - Codex local context

- [x] Fetch/index MCP + CLI
- [x] Alpha-launch docs and getting-started for GitHub-first installs
- [ ] Broader library catalog defaults

## M5 - Tuned / Granite

- [x] Dataset generators and eval harness
- [x] Granite 4.1-8B fine-tune complete and evaluated (ChaosNexus Tuned v1, Anvil mean 0.944)
- [x] Hugging Face model card + weights publish ([ChaosNexus_Tuned_v1](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1))
- [x] Documented &lt;6GB VRAM consumer path
- [x] Alpha announce live (docs, Hub, GitHub, blog / LinkedIn / X)

## M6 - Crucible (local LLM interface)

- [x] Candle / Colibri inference scaffold
- [x] Alpha-launch public repo on GitHub
- [ ] Stable MCP integration with Anvil
- [x] Packaged local chat path in Forge (bridges to fine-tuned Granite via Crucible)

## M7 - Community and licensing

- [x] Alpha-launch docs: licensing, support, contribution topology, AI assistance disclosure
- [x] CODE_OF_CONDUCT shipped in component trees
- [ ] Commercial license one-pager / terms
- [ ] GitHub issue templates
- [ ] First `v0.1.0-alpha` tags on GitHub

## M8 - 1.0 readiness

- [ ] Stable config schema and migration notes
- [ ] Full E2E coverage for Forge interactables
- [ ] Security disclosure process exercised end-to-end
- [x] Polyrepo sync hardened (inbound PR porting runbook in `launch/GITHUB_INBOUND_PR_RUNBOOK.md`)
- [x] Docs site live on chaosnexus.ai (Cloudflare Pages; production history pruned)
