---
title: "Using ChaosNexus Scripts"
description: "Author plugins, capabilities, and shared lib imports"
---

# Using ChaosNexus Scripts

## Plugin shape

Each live plugin is a folder under `plugins/<name>/` with at least:

- `plugin.toml` - name, version, dependencies, capability declarations
- An entry `.rhai` script that registers tools / logic

Example capability block:

```toml
name = "time"
version = "1.0.0"
dependencies = []

[capabilities]
granted = ["net_http"]
```

Host TOML remains authoritative for what Anvil actually allows; plugin manifests declare intent. See [security model](/context/security_model).

## Shared libraries

Pure helpers live under `lib/`. Import them from a plugin:

```rhai
import "lib/string_utils" as su;
su::join_nonempty(["a", "", "b"], "-");
```

Rules of thumb:

1. No `register_tool` / side effects at import time in `lib/`.
2. Prefer `private fn` for internals; `export` for shared constants.
3. Do not import another plugin's entry script; use Anvil cross-plugin APIs when needed.
4. `plugin.toml` `dependencies` control **startup order**, not module imports.

## Quarantine and approval

LLM-scaffolded plugins go to `.pending/` and are **not** loaded until a human approves them in Forge. That path is part of the scripts root layout Anvil expects.

## Bundled examples

The alpha tree includes demos such as `time`, `terminal`, `http_check`, `mcp_bridge_demo`, `translation_test`, and others under `plugins/`. Treat demos as references; review capabilities before enabling on a sensitive host.

## Visual sidecars

Forge may store canvas sidecars under `plugins/<name>/.chaosnexus-forge/`. They are editor metadata, not Anvil runtime requirements.

## Next

- [Layout](./layout)
- [Anvil Rhai API](/guide/chaosnexus-anvil/rhai-api)
- [Vhai overview](/vhai/)
