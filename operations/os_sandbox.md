---
title: "OS-Level Sandbox for ChaosNexus Anvil"
description: "Documentation for OS-Level Sandbox for ChaosNexus Anvil"
---
# OS-Level Sandbox for ChaosNexus Anvil

In-process Rhai limits cannot contain `run_command` or `mcp_connect`. Use OS-level isolation in production.

## Recommended deployment

1. Run `ChaosNexus Anvil` as a dedicated unprivileged user (`ChaosNexus Anvil`).
2. Grant read/write only to `scripts/` and engine data dir (`.ChaosNexus Anvil_data/`).
3. Do not pass secrets via environment; use capability-gated secret broker when needed.
4. Optional: systemd service with `NoNewPrivileges=yes`, `PrivateTmp=yes`, `ProtectSystem=strict`.

## Landlock (Anvil)

On Linux, Anvil applies **Landlock** at startup (`scripting/sandbox.rs`) after creating the scripts layout. The process may read/write under `scripts_root` (including `plugins/`, `lib/`, `data/`, `.pending/`) and gets read-only access to essential system paths (`/usr`, `/lib*`, `/etc`, `/dev`, `/proc`, …) plus `/tmp` so TLS and the dynamic linker keep working. The rest of the filesystem (including arbitrary `$HOME` paths outside `scripts_root`) is denied.

Set `CHAOSNEXUS_ANVIL_DISABLE_LANDLOCK=1` to skip (legacy alias: `CHAOSWRENCH_DISABLE_LANDLOCK`). If the kernel lacks Landlock or ruleset creation fails, Anvil currently **continues unsandboxed** (fail-open) after logging - production MCP hosts should treat a non-`Applied` status as a deploy error until a `--require-landlock` flag exists. Landlock does **not** replace capability gates for `run_command` / network - combine with systemd/`NoNewPrivileges` and deny-by-default host grants.

## Container

For LLM-facing MCP deployments, prefer a container with:

- Read-only root except `scripts/` mount
- No Docker socket / host network unless required
- Separate MCP server container from ChaosNexus Forge desktop IDE
