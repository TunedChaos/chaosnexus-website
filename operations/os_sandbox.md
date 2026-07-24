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

## Landlock / seccomp (future automation)

The crate `ChaosNexus Anvil/src/scripting/sandbox.rs` documents optional Landlock rules for Linux. Full enforcement requires running the binary with `CAP_SYS_ADMIN` during sandbox setup or using a pre-sandboxed wrapper.

## Container

For LLM-facing MCP deployments, prefer a container with:

- Read-only root except `scripts/` mount
- No Docker socket / host network unless required
- Separate MCP server container from ChaosNexus Forge desktop IDE
