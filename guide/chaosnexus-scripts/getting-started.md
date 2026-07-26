---
title: "Getting Started with ChaosNexus Scripts"
description: "Clone the scripts tree and point Anvil at it"
---

# Getting Started with ChaosNexus Scripts

## Option A: Monorepo

If you already have the ChaosNexus monorepo, the tree is at `chaosnexus-scripts/`. From `chaosnexus-anvil/`, the default probe is `../chaosnexus-scripts`.

```toml
# chaosnexus-anvil/chaoswrench.toml (example)
scripts_dir = "../chaosnexus-scripts"
```

## Option B: Standalone polyrepo

```bash
git clone https://codeberg.org/TunedChaos/chaosnexus-scripts.git
cd chaosnexus-scripts
```

Point Anvil at the clone root (the directory that contains `plugins/` and `lib/`):

```toml
scripts_dir = "/absolute/path/to/chaosnexus-scripts"
```

Or:

```bash
chaosnexus-anvil --scripts-dir /absolute/path/to/chaosnexus-scripts
```

## Open in Forge

In ChaosNexus Forge, use **(O)** / open workspace and choose the `plugins` directory (or a parent Anvil recognizes as the scripts root). Defaults probe `../chaosnexus-scripts/plugins` in the monorepo layout.

## Verify

1. Start Anvil with that `scripts_dir`.
2. Confirm plugins appear in tool lists / Forge registry (for example `time`, `terminal`, demos under `plugins/`).
3. Disabled samples live under `plugins/disabled/` and are not loaded.

## Next

- [Usage](./usage) for authoring plugins and `lib/` imports
- [Layout](./layout) for directory rules and quarantine
- [Anvil getting started](/guide/chaosnexus-anvil/getting-started)
