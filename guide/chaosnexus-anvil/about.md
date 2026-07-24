---
title: "About ChaosNexus Anvil"
description: "Documentation for About ChaosNexus Anvil"
---
# About ChaosNexus Anvil

ChaosNexus Anvil is the backend Model Context Protocol Host Engine for Tuned Chaos. Written in Rust, it acts as a highly concurrent, sandboxed plugin execution environment powered by the Rhai scripting language.

## What It Is

At its core, ChaosNexus Anvil is an MCP server designed to be dynamically extensible. Instead of hardcoding tools and resources into the compiled Rust binary, ChaosNexus Anvil delegates its business logic to hot-reloadable Rhai scripts. This allows developers and AI agents to modify, add, or remove capabilities on the fly without recompiling the server. It provides a secure, sandboxed environment for these scripts while exposing a carefully controlled bridge to native system capabilities.

Furthermore, ChaosNexus Anvil features deep interconnectivity. It acts both as an MCP server to client applications and can connect directly to other external MCP servers. This interconnectivity is made available directly to your tools through the flexible Rhai plugin architecture.

## What It Does

ChaosNexus Anvil serves two primary roles within the Tuned Chaos ecosystem:

1. **MCP Server**: It communicates over standard Stdio transport, exposing tools, prompts, and resources to connected AI agents following the standard Model Context Protocol. It can interoperate with other external MCP servers to expand its toolset.
2. **Plugin Sandbox**: It executes script plugins using the Rhai language. It uses locking primitives to safely manage concurrent state across multiple asynchronous tasks, preventing race conditions while scripts interact with the native filesystem, HTTP endpoints, or system shell.

::: tip Architecture Concept
Think of ChaosNexus Anvil as the operating system for your agentic tools. It provides the memory, networking, and filesystem access APIs, while the Rhai scripts act as the applications that define the actual tool logic.
:::

## How to Launch

As an MCP Server, ChaosNexus Anvil is designed to be built for release and connected to your chosen agent. 

To build the executable, navigate to the `ChaosNexus Anvil` directory and run:

```bash
cargo build --release
```

Once built, you must configure the path to the resulting executable within the standard MCP configurations for your agent or client platform (for example: Cursor, Antigravity, OpenCode, or Claude).
