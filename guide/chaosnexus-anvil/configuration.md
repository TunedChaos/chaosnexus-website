---
title: "ChaosNexus Anvil Configuration"
description: "How to configure ChaosNexus Anvil via TOML"
---

# ChaosNexus Anvil Configuration

ChaosNexus Anvil is the primary execution engine. It manages scripts, plugins, and handles the `cvars` (configuration variables) that define your agent's capabilities.

If a configuration file is missing when the server starts, it will automatically generate a boilerplate configuration file in its working directory.

**Configuration File**: `chaosnexus-anvil.toml` (also loads `~/.chaosnexus/anvil/chaosnexus-anvil.toml`)

### Example Boilerplate

```toml
# ChaosNexus Anvil Configuration
# Schema matches Config in chaosnexus-anvil (not legacy plugin_permissions).

name = "My ChaosNexus Anvil Instance"
scripts_dir = "./chaosnexus-scripts"
# max_proxy_response_length = 1048576

[plugins.check_server]
granted_capabilities = ["shell", "net_http"]
env_allowlist = ["MY_API_TOKEN"]

[plugins.check_server.permissions]
shell = ["ping"]
http = ["GET"]
net_allowlist = ["api.github.com"]

# Map logical names -> environment variable NAMES (never raw secret values).
[plugins.check_server.secrets]
API_TOKEN = "MY_API_TOKEN"
```

### Key Concepts

- **CVars**: Configuration variables (stored in `cvars.toml`) are dynamically injected and override default plugin values.
- **Security Profiles**: Per-plugin gates live under `[plugins.<name>]` with `granted_capabilities` and `[plugins.<name>.permissions]` (`shell`, `http`, `net_allowlist`, `sql`, `fs`, …). Deny-by-default: omit a grant and the capability is closed.
- **Network allowlist**: Host patterns only (e.g. `api.github.com`, `*.example.com`). A bare `*` is rejected unless you explicitly opt in with `CHAOSNEXUS_ANVIL_ALLOW_NET_STAR=1`.
- **Shell**: Prefer `run_command(exec, args)` (argv). The legacy `run_command(shell, command)` `-c` path is disabled unless `CHAOSNEXUS_ANVIL_ALLOW_SHELL_C=1`.
- **Secrets**: Host TOML must not embed secret material. Use `env_allowlist` and/or `[plugins.<name>.secrets]` where values are **env var names** resolved at runtime.

Legacy `[plugin_permissions.*]` blocks are **ignored** by the loader - migrate them to `[plugins.<name>]`.
