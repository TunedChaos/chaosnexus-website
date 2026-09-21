---
title: "Repository Architecture and Distribution"
description: "GitHub public repositories, sibling component checkouts, Suite Releases"
---

# Repository Architecture and Distribution

## Topology

```
sibling component checkouts                 GitHub (public host + Sponsors)
Tuned Chaos maintainers                     github.com/TunedChaos
─────────────────────────                   ─────────────────────
chaosnexus-anvil/      ──publish──►         chaosnexus-anvil
chaosnexus-forge/      ──publish──►         chaosnexus-forge
chaosnexus-website/    ──publish──►         chaosnexus-website
chaosnexus-codex/      ──publish──►         chaosnexus-codex
chaosnexus-tuned/      ──publish──►         chaosnexus-tuned
chaosnexus-crucible/   ──publish──►         chaosnexus-crucible
chaosnexus-scripts/    ──publish──►         chaosnexus-scripts
chaosnexus-suite/      ──publish──►         chaosnexus-suite
```

| Tier | Role |
|------|------|
| **sibling component checkouts** | Internal source of truth for Tuned Chaos maintainers |
| **[GitHub](https://github.com/TunedChaos)** | Public repositories; open issues and pull requests here; [Sponsors](https://github.com/sponsors/TunedChaos) |

## Adopter downloads (Suite)

End-user installers (Forge + Anvil + Codex + Crucible + slim Scripts) are packaged from the workspace and published as **Releases** on **[chaosnexus-suite](https://github.com/TunedChaos/chaosnexus-suite)** (canonical). Component repositories remain for development and contribution.

## Contribution rule

Open issues and PRs on **GitHub**. Maintainers integrate accepted changes into the sibling component checkouts.

## Sync automation

Maintainers publish workspace prefixes to GitHub repositories (subtree split on `main`).

Docs site deploys from the workspace to Cloudflare Pages ([chaosnexus.ai](https://chaosnexus.ai)).

## Workspace prefixes

| Prefix | GitHub repo |
|--------|-------------|
| `chaosnexus-anvil/` | `chaosnexus-anvil` |
| `chaosnexus-forge/` | `chaosnexus-forge` |
| `chaosnexus-website/` | `chaosnexus-website` |
| `chaosnexus-codex/` | `chaosnexus-codex` |
| `chaosnexus-tuned/` | `chaosnexus-tuned` |
| `chaosnexus-crucible/` | `chaosnexus-crucible` |
| `chaosnexus-scripts/` | `chaosnexus-scripts` |
| `chaosnexus-suite/` | `chaosnexus-suite` (packaging + Release landing) |
