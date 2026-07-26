---
title: "ChaosNexus Anvil Security Model"
description: "Documentation for ChaosNexus Anvil Security Model"
---
# ChaosNexus Anvil Security Model

Single source of truth for trust boundaries, threat classes, and the capability taxonomy enforced by the engine.

## Trust boundaries

| Actor | Trust level | Notes |
|-------|-------------|-------|
| Human operator via ChaosNexus Forge | Trusted | Can approve pending plugins and grant capabilities |
| Bundled plugins in `scripts/plugins/` | Semi-trusted | Loaded only after human install or Forge scaffold |
| LLM-authored plugins (`ChaosNexus Anvil_create_plugin`) | Untrusted | Written to `scripts/.pending/`; never loaded until human approval |
| Untrusted data (HTTP bodies, file contents, downstream MCP output) | Untrusted | May steer the LLM (LITL); must not become executing code without HITL |

## Threat classes

### LLM-in-the-loop (LITL)

An LLM reads untrusted data, generates a Rhai plugin, and the engine executes it with host privileges. Mitigations:

- Fail-closed quarantine: `ChaosNexus Anvil_create_plugin` writes to `.pending/`, never loads
- ChaosNexus Forge HITL approval before promotion to `plugins/`
- Default-deny capability allowlist on every promoted plugin

### Human-in-the-loop (HITL)

Dangerous actions execute without meaningful human review. Mitigations:

- Pending approval UI shows full source + requested capabilities
- Human selects granted capability subset on approve
- No `auto_reload` on LLM create path

## Topology

Two `ChaosNexus Anvil` processes may share one `scripts/` directory:

1. **MCP server** (stdio) - LLM-facing, includes `ChaosNexus Anvil_create_plugin`
2. **Supervised engine** (`--supervised`) - ChaosNexus Forge child process

Approval bridge: on-disk `.pending/` + ChaosNexus Forge promote + `reload` on both sides.

## Capability taxonomy (default-deny)

All plugins start with **no** capabilities unless granted in `plugin.toml` under `[capabilities]` or approved via ChaosNexus Forge.

| Capability | Gated natives |
|------------|---------------|
| `shell` | `run_command` |
| `process_spawn` | `mcp_connect` |
| `net_http` | `http_get`, `http_post`, `ntp_request` |
| `net_tcp` | `tcp_request` |
| `net_ws` | `ws_connect` |
| `host_read` | `load_config_string` |
| `env` | `get_env` (hard error when denied) and `CONFIG.secrets` (per-var allowlist in manifest) |
| `db_external` | non-`sqlite://` `db_connect` |
| `install` | `sys_install_plugin` (routes to staging only) |
| `fs_cross_plugin` | `fs_*` when `plugin_name` != caller |
| `kv_dump` | `kv_dump` |
| `shared_global` | unprefixed `set_global` / `get_global` keys |

SQLite `db_connect` remains confined to the caller's plugin directory without `db_external`.

## Scoped secret/config delivery (`CONFIG`)

Every plugin callback runs with an immutable, identity-scoped `CONFIG` constant injected into its Rhai scope (no `import` needed), built per-invocation under `CURRENT_PLUGIN`:

- `CONFIG.plugin` - the calling plugin's own name
- `CONFIG.cvars.<name>` - only cvars owned by (scoped to) this plugin
- `CONFIG.secrets.<NAME>` - host env vars the plugin was granted via `env` + `env_allowlist`

This is the preferred path for tokens/keys: secrets reach the script through `CONFIG` instead of ambient host state. A plugin can never observe another plugin's `CONFIG`, and the constant cannot be reassigned. `get_env` remains available (same `env` + allowlist gate) but is discouraged in favor of `CONFIG.secrets`. When a plugin calls `get_env` for a key outside its `env_allowlist`, the engine raises a Rhai error (fail-closed) instead of returning an empty string. Built in `chaosnexus-anvil/src/scripting/config_inject.rs`.

## Caller identity

`CURRENT_PLUGIN` is set by the engine before every plugin callback. Natives that accept `plugin_name` verify it matches `CURRENT_PLUGIN` unless `fs_cross_plugin` is granted.

## Reserved events

Only the engine may fire: `on_cvar_changed`. Scripts cannot spoof lifecycle hooks.

## Engine limits

- `eval` disabled
- Bounded call depth, string/array/map sizes
- Module imports limited to `lib/` and owning plugin directory
- Event/native recursion budget (same order as MCP hop limit)

## OS defense in depth

See [operations/os_sandbox.md](../operations/os_sandbox.md). In-process Rhai cannot contain `shell` or `process_spawn`; run the engine as an unprivileged user with optional Landlock/seccomp.

## Future hardening phase (backlog)

The following items are documented for a follow-up security phase; they are not yet enforced:

| Area | Current behavior | Target |
|------|------------------|--------|
| `run_command` | Shell `-c` with a single concatenated command string; terminal plugin appends args via string concat | argv-based execution; reject or escape shell metacharacters in untrusted args |
| `http_get` / `http_post` | Any URL accepted when `net_http` is granted | SSRF controls: scheme/host allowlist, block private/link-local ranges |
| Capability promotion | `[capabilities]` appended only when absent at approve time; later manual `plugin.toml` edits reload without re-approval | Re-approval or signed manifest when capabilities change post-install |
