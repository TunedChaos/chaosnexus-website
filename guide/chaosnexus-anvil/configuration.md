---
title: "ChaosNexus Anvil Configuration"
description: "How to configure ChaosNexus Anvil via TOML"
---

# ChaosNexus Anvil Configuration

ChaosNexus Anvil is the primary execution engine. It manages scripts, plugins, and handles the `cvars` (configuration variables) that define your agent's capabilities. 

If a configuration file is missing when the server starts, it will automatically generate a boilerplate configuration file in its working directory.

**Configuration File**: `chaosnexus-anvil.toml`

### Example Boilerplate
```toml
# ChaosNexus Anvil Configuration
# This file controls high-level server behavior and plugin boundaries.

# name = "My ChaosNexus Anvil Instance"
# scripts_dir = "./chaosnexus-scripts"
# max_proxy_response_length = 1048576

# [plugin_permissions."check_server"]
# allowed_shell_commands = ["ping", "curl"]
# data.network = [ { domain = "api.github.com", methods = ["GET"] } ]
# data.database = [ { url_prefix = "postgres://", ops = ["SELECT"] } ]
```

### Key Concepts
- **CVars**: Configuration variables (stored in `cvars.toml`) are dynamically injected and override default plugin values.
- **Security Profiles**: You can restrict shell commands, network access, and database operations on a per-plugin basis via the `plugin_permissions` block.
