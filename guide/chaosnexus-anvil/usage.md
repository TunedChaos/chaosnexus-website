---
title: "Using ChaosNexus Anvil"
description: "Documentation for Using ChaosNexus Anvil"
---
# Using ChaosNexus Anvil

ChaosNexus Anvil is designed to operate as a local-first Model Context Protocol (MCP) host engine. Its primary usage revolves around executing Rhai scripts and managing connections to other MCP servers.

## Standard Execution

To launch ChaosNexus Anvil as an MCP server, you can start it in serve mode and specify an open port:

```bash
ChaosNexus Anvil serve --port 8080
```

This mode allows compatible clients to connect and interact with the engine.

## Executing Local Workflows

If you wish to execute a local Rhai workflow script directly without running the persistent server, use the run command:

```bash
ChaosNexus Anvil run my_workflow.rhai
```

This is particularly useful for one-off tasks or testing newly developed Rhai plugins.

## Configuration

ChaosNexus Anvil uses standard environment variables for configuration. You can set the logging level to debug to receive detailed operational output:

```bash
RUST_LOG=debug ChaosNexus Anvil run my_workflow.rhai
```

By default, ChaosNexus Anvil expects your Rhai scripts under a scripts root (`chaosnexus-scripts/` in the monorepo, or any path set via `scripts_dir` / `--scripts-dir`). Ensure plugins live under that root's `plugins/` directory before execution.

## Interacting with other MCP Servers

ChaosNexus Anvil is designed to be highly collaborative. Through your Rhai scripts, you can dynamically call other standalone MCP servers, such as ChaosData or ChaosNexus Codex, to retrieve context or process information. Ensure that any external MCP servers are configured in your local environment prior to executing scripts that depend on them.
