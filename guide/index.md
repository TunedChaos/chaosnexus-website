---
title: "What is ChaosNexus?"
description: "Documentation for What is ChaosNexus?"
---
<!-- docs/guide/index.md -->
# What is ChaosNexus?

Welcome to **ChaosNexus**, an open-source, local-first agentic orchestration platform designed from the ground up for safe, lightweight, and sovereign development with artificial intelligence. 

Instead of routing execution to heavy cloud systems or giving unverified AI agents full, unboxed access to your system shell, ChaosNexus establishes a zero-trust, event-driven command grid directly on your local machine.

---

## The Core Ecosystem

ChaosNexus is structured as a monorepo consisting of four primary pillars:

```chaoscanvas mode="architecture"
nodes:
  - id: forge
    label: "<b>ChaosNexus Forge - Desktop IDE / Control Desk</b><br/>Monaco Editor<br/>Svelte Flow"
  - id: engine
    label: "<b>ChaosNexus Anvil - Rust Execution Actuator</b><br/>Rhai Script Engine<br/>Axum Webhook Server<br/>DB & CVars"
  - id: oracle
    label: "<b>ChaosNexus Codex / ChaosData - Context Oracles</b><br/>Token-efficient local indexes<br/>Deterministic doc retrieval"
  - id: tuner
    label: "<b>ChaosNexus Tuned - Low-Resource Trainer</b><br/>Alpine & Unsloth Pipelines<br/>Quantized local model"
edges:
  - source: forge
    target: engine
    label: Tauri IPC Commands
  - source: engine
    target: oracle
    label: MCP JSON-RPC
  - source: tuner
    target: engine
    label: Fine-tuned weights
    style: { strokeDasharray: 5 }
```

### 1. ChaosNexus Anvil (The Actuator)
The core backend engine written in Rust. It functions as a sandboxed runtime executing custom **Rhai** scripts on the fly. It is responsible for:
*   Exposing script-defined tools to LLM clients (such as Claude Desktop or Cursor).
*   Enforcing granular user permissions (file, network, and shell execution limits).
*   Routing communication across the local Event Bus and global Key-Value store.
*   Managing database connections and dynamic Configuration Variables (CVars).
*   Federating external Model Context Protocol (MCP) servers into a unified mesh.

### 2. ChaosNexus Forge (The Control Desk)
A desktop IDE companion built with Svelte 5 and Tauri. It operates as the visual cockpit of the system:
*   **Dual-View Pane**: Split visual modeling (Svelte Flow visual canvas) and code editing (Monaco Editor with custom Rhai Monarch grammar).
*   **Bidirectional Sync**: Modifying the flow graph generates clean Rhai logic; editing code updates the visual node graph.
*   **Control Center**: Start, stop, and reload the engine plugins dynamically, and inspect live log streams.
*   **Gatekeeping Interceptors**: Intercepts script creation signals from the engine, allowing developers to review and approve newly generated AI code before it executes.

### 3. ChaosNexus Tuned (The LLM Trainer)
A lightweight model fine-tuning workflow built on top of Unsloth. By extracting API schema definitions and generating synthetic Alpaca-formatted datasets, ChaosNexus Tuned allows you to train small, quantized open-source models (like Granite-4.1-8B) to run efficiently on low VRAM (<6GB) while writing flawless Rhai scripts for ChaosNexus without hallucination.

### 4. ChaosNexus Codex & ChaosData (The Oracles)
Integrated utilities that optimize context sizes:
*   **ChaosNexus Codex**: Fetches, compiles, and exposes thousands of pages of local documentation.
*   **ChaosData**: Inspects local database schemas and filters structure details.
*   By letting the AI query these local oracles from within ChaosNexus Anvil, the system drops token usage to a fraction of standard cloud models.

### 5. ChaosNexus Crucible (The LLM Interface)
Local inference bridge (Candle / Colibri) with an HTTP generate API and optional MCP client toward Anvil. It does **not** own training or Hub weights. Guide: [About Crucible](/guide/chaosnexus-crucible/about).

### 6. ChaosNexus Scripts (The Plugin Tree)
Shared Rhai `plugins/` and `lib/` consumed by Anvil (`scripts_dir`). Guide: [About Scripts](/guide/chaosnexus-scripts/about).

---

## Where to Go Next

*   **[Who is it for?](/guide/who-is-it-for)**: Find out who this platform is built for: from security-conscious developers to legal e-discovery and data extraction professionals.
*   **[Read the Origin Story](/guide/what-and-why)**: Discover the inspiration behind ChaosNexus, drawing from game-engine scripting extensions (like SourceMod and Pawn) to solve modern AI tool-calling risks.
*   **[Quickstart](/guide/quickstart)**: Install the dependencies and write your first Hello World plugin.
*   **[Architecture Concept](/guide/concept-architecture)**: Dive deeper into the SSOT pipeline, IPC communication, and the visual scripting model.
