---
title: "About ChaosNexus Scripts"
description: "Shared Rhai plugins and libraries for ChaosNexus Anvil"
---

# About ChaosNexus Scripts

**ChaosNexus Scripts** is the shared Rhai **plugins** and **libraries** tree consumed by ChaosNexus Anvil. In the monorepo it lives at `chaosnexus-scripts/`. On Codeberg it is the [chaosnexus-scripts](https://codeberg.org/TunedChaos/chaosnexus-scripts) polyrepo ([GitHub mirror](https://github.com/TunedChaos/chaosnexus-scripts)).

Anvil's `scripts_dir` (or `--scripts-dir`) must point at this tree's root. Plugins are loaded from `plugins/`; shared modules resolve under `lib/`.

## What it contains

| Path | Role |
|------|------|
| `plugins/` | Hot-reloadable Rhai plugins (`plugin.toml` + entry `.rhai`) |
| `lib/` | Side-effect-free shared Rhai modules (`import "lib/..."`) |
| `.pending/` | Quarantine for new plugins awaiting Forge human approval (runtime; not published junk) |

Maintainer alpha-launch helpers live in the monorepo at `tools/launch/` and are **not** part of this polyrepo.

## How it fits

```
Forge (edit / approve)  →  scripts root (this tree)  →  Anvil (load & sandbox)
```

- Forge opens a workspace under `.../plugins` (or the scripts root).
- Anvil discovers plugins, enforces capabilities from host TOML, and registers MCP tools from scripts.
- Codex / Crucible are separate: docs oracle and LLM interface respectively.

## Status

Early public alpha (pre-1.0). Plugin set and conventions may grow; security model stays host-authoritative (see [security model](/context/security_model)).

## Next

- [Getting started](./getting-started)
- [Usage](./usage)
- [Layout and conventions](./layout)
- Anvil [configuration](/guide/chaosnexus-anvil/configuration) (`scripts_dir`)
