---
title: "ChaosNexus Scripts Layout"
description: "Directory conventions for the Anvil scripts root"
---

# ChaosNexus Scripts Layout

Logical **scripts root** (monorepo / polyrepo checkout):

```
chaosnexus-scripts/
├── plugins/           # discovered plugins (one folder per plugin)
│   ├── <name>/
│   │   ├── plugin.toml
│   │   ├── <entry>.rhai
│   │   └── .chaosnexus-forge/   # optional Forge canvas sidecars
│   └── disabled/      # never loaded
├── lib/               # shared import "lib/..." modules
├── .pending/          # quarantine (runtime; awaiting Forge approval)
├── data/              # optional shared data namespaces (runtime)
└── README.md
```

## Discovery rules (Anvil)

| Path | Loaded? |
|------|---------|
| `plugins/<name>/` | Yes, if valid plugin |
| `plugins/disabled/` | No |
| `.pending/` | No until approved / moved |
| `lib/` | On `import "lib/..."`, not as MCP plugins |

## Pointing Anvil here

`scripts_dir` must be this root, not `plugins/` alone (unless your tooling treats `plugins` as a child of the configured root). Monorepo default from `chaosnexus-anvil/`:

```toml
scripts_dir = "../chaosnexus-scripts"
```

## What is not in the public polyrepo

- Monorepo `tools/launch/` helpers
- Local `.chaoswrench_data/` event dumps (gitignored)

## Related

- [About](./about)
- [Anvil paths / sandbox](/guide/chaosnexus-anvil/configuration)
- [OS sandbox ops](/operations/os_sandbox)
