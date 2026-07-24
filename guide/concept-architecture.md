---
title: "Architecture Concept"
description: "High-level architecture and system components of ChaosNexus."
---
# Architecture

This article explains the basic architecture of the ChaosNexus environment and how the different services interact to form a zero-trust, local-first agentic grid.

ChaosNexus is fundamentally built around the **Single Source of Truth (SSOT)** paradigm. It ensures that the execution engine (ChaosNexus Anvil) holds all state, while the graphical frontend (ChaosNexus Forge) simply acts as a visual control desk.

To use ChaosNexus, you must understand how these core pillars communicate and execute commands securely.

## Components of ChaosNexus

### The Command Grid & Actuator
ChaosNexus Anvil (the Rust backend) serves as the execution **Actuator** and ChaosNexus Forge (the Tauri frontend) serves as the Svelte-based **Control Desk** of the federated **ChaosNexus Command Grid**.

- **No isolated state islands**: The frontend acts exclusively as a high-performance visual terminal.
- **Native Interception**: All destructive operations (such as closing tabs or exiting the application) are strictly intercepted by the UI, but their actual execution and unspooling are handed over to custom Rust commands (e.g., `app_handle.exit(0)`).

### Dynamic Schema Ingestion
To prevent hardcoding and ensure maximum extensibility:
- **`chaos_schema.json`** serves as the API contract between the scripting engine and the UI.
- The Tauri backend loads the schema from a safe, OS-approved configuration directory using `load_engine_schema` and pipes it into the Svelte 5 application state.

### Industrial Aesthetics
The UI strictly adheres to an industrial, highly technical visual language:
- Clean lines, dense information displays, and precise spacing.
- High-contrast, colorblind-friendly modes native to the core design system.

## ChaosNexus Architectural Flow

The following visual aid demonstrates the system integration:

```chaoscanvas mode="architecture"
nodes:
  - id: LLM
    label: "LLM Orchestrator - ChaosNexus Tuned"
  - id: FORGE
    label: "ChaosNexus Forge - Tauri Control Desk"
  - id: WRENCH
    label: "ChaosNexus Anvil - MCP Server + Rhai Engine"
  - id: DOCS
    label: "ChaosNexus Codex"
  - id: DATA
    label: "ChaosData"
  - id: EXT
    label: "External MCP Servers"
edges:
  - source: LLM
    target: WRENCH
    label: "MCP JSON-RPC over stdio"
  - source: FORGE
    target: WRENCH
    label: "Tauri IPC control"
  - source: WRENCH
    target: DOCS
    label: "MCP JSON-RPC over stdio"
  - source: WRENCH
    target: DATA
    label: "MCP JSON-RPC over stdio"
  - source: WRENCH
    target: EXT
    label: "MCP JSON-RPC over stdio"
```

## ChaosNexus Anvil Mechanics (Rhai + MCP)

This diagram maps the incoming MCP `call_tool` path to the Rhai engine and the outbound MCP bridge (`mcp_client.rs`), including the lock-drop requirement that prevents deadlocks.

```chaoscanvas mode="architecture"
nodes:
  - id: LLM
    label: "LLM Client - tool call via stdio"
  - id: SERVER
    label: "ChaosNexus Anvil/src/server.rs<br/>handle_call_tool_request"
  - id: ENGINE
    label: "ChaosNexus Anvil/src/scripting/engine.rs<br/>Rhai Engine"
  - id: CTX
    label: "NativeContext - Arc Mutex / RwLock state"
  - id: BRIDGE
    label: "ChaosNexus Anvil/src/scripting/native_api/mcp_client.rs<br/>do_call_tool"
  - id: DOWNSTREAM
    label: "Downstream MCP Server<br/>ChaosNexus Codex / ChaosData / External"
edges:
  - source: LLM
    target: SERVER
    label: "MCP JSON-RPC (stdio)"
  - source: SERVER
    target: ENGINE
    label: "dispatch tool to Rhai"
  - source: ENGINE
    target: BRIDGE
    label: "mcp::call_tool"
  - source: ENGINE
    target: CTX
    label: "capability/context checks"
  - source: BRIDGE
    target: CTX
    label: "uses NativeContext.mcp_clients lock<br/>DROP lock before await"
  - source: BRIDGE
    target: DOWNSTREAM
    label: "outbound MCP JSON-RPC (stdio)"
```

> [!CAUTION]
> Lock mechanics and deadlock avoidance: outbound MCP calls (`do_call_tool`) must ensure any upstream locks (for example `ctx.mcp_clients.lock().unwrap()`) are released before any await/yield point. Otherwise, re-entrant handlers can block on the same lock and deadlock the server.

## Related resources

If you would like to dive deeper or start implementing ChaosNexus components, check out the following resources:

1. [Quickstart Guide](./quickstart)
2. [What and Why](./what-and-why)
