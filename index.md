---
layout: home
title: ChaosNexus
description: "Sovereign, local-first agentic orchestration - Anvil engine + Forge IDE from Tuned Chaos LLC. Contribute on Codeberg."

hero:
  name: "ChaosNexus"
  text: "Sovereign, local-first agentic orchestration"
  tagline: "Early alpha launch (pre-1.0) - Anvil engine + Forge IDE from Tuned Chaos LLC. Contribute on Codeberg."
  image:
    src: /logo.svg
    alt: ChaosNexus Logo
  actions:
    - theme: brand
      text: What and Why
      link: /guide/what-and-why
    - theme: alt
      text: Quickstart
      link: /guide/quickstart
    - theme: alt
      text: Project status
      link: /project_status_and_next_steps

features:
  - title: ChaosNexus Anvil
    details: Sandboxed Rust MCP host executing hot-reloadable Rhai plugins with host-authoritative default-deny permissions.
    link: /guide/chaosnexus-anvil/about
  - title: ChaosNexus Forge
    details: Tauri + Svelte 5 IDE with Vhai visual scripting and human approval before agent-written plugins run.
    link: /guide/chaosnexus-forge/about
  - title: Zero-trust sandboxing
    details: Six-layer defense in depth - built for a world where agent tool use can escape naive sandboxes.
    link: /guide/why-local-sandboxing
  - title: Local models (in progress)
    details: Tuned pipeline targets Granite 4.1-8B under roughly 6GB VRAM for Rhai tooling. Weights training now.
    link: /project_status_and_next_steps
  - title: Licensing
    details: AGPLv3-or-later for the community; commercial licenses available from Tuned Chaos LLC.
    link: /guide/licensing
  - title: Roadmap
    details: Public milestones from Codeberg polyrepos through 1.0 readiness.
    link: /roadmap
---
