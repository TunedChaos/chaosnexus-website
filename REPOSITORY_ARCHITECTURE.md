---
title: "Repository Architecture and Distribution"
description: "Codeberg polyrepos (contribute), GitHub mirrors, private monorepo SSOT"
---

# Repository Architecture and Distribution

## Topology

```
Private monorepo (SSOT)          Codeberg (contribute)         GitHub (mirrors + Sponsors)
Tuned Chaos maintainers          codeberg.org/TunedChaos       github.com/TunedChaos
─────────────────────────        ─────────────────────         ────────────────────
chaosnexus/ (private)  ──subtree──► chaosnexus-anvil    ──mirror──► chaosnexus-anvil
                           split ─► chaosnexus-forge    ──mirror──► chaosnexus-forge
                                  ► chaosnexus-website  ──mirror──► chaosnexus-website
                                  ► chaosnexus-codex    ──mirror──► chaosnexus-codex
                                  ► chaosnexus-tuned    ──mirror──► chaosnexus-tuned
                                  ► chaosnexus-crucible ──mirror──► chaosnexus-crucible
                                  ► chaosnexus-scripts  ──mirror──► chaosnexus-scripts
```

| Tier | Role |
|------|------|
| **Private monorepo** | Internal source of truth for Tuned Chaos maintainers |
| **[Codeberg](https://codeberg.org/TunedChaos)** | Public polyrepos; **primary** for issues and pull requests |
| **[GitHub](https://github.com/TunedChaos)** | Read-mostly mirrors for discovery and [GitHub Sponsors](https://github.com/sponsors/TunedChaos) |

## Contribution rule

Open issues and PRs on **Codeberg**. Maintainers integrate accepted changes into the private monorepo. GitHub pull requests on mirrors are not accepted; READMEs point contributors to Codeberg.

## Sync automation

Maintainers sync monorepo prefixes to Codeberg polyrepos (subtree split on `main`). After Codeberg repos exist, **Codeberg push mirrors** keep matching GitHub repositories updated.

Docs site deploys from the monorepo to Cloudflare Pages ([chaosnexus.ai](https://chaosnexus.ai)).

## Monorepo prefixes

| Prefix | Codeberg / GitHub repo |
|--------|------------------------|
| `chaosnexus-anvil/` | `chaosnexus-anvil` |
| `chaosnexus-forge/` | `chaosnexus-forge` |
| `chaosnexus-website/` | `chaosnexus-website` |
| `chaosnexus-codex/` | `chaosnexus-codex` |
| `chaosnexus-tuned/` | `chaosnexus-tuned` |
| `chaosnexus-crucible/` | `chaosnexus-crucible` |
| `chaosnexus-scripts/` | `chaosnexus-scripts` |
