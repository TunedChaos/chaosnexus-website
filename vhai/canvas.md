---

title: "Vhai Canvas"
description: "Documentation for Vhai Canvas"

---

# Vhai Canvas

Vhai (Visual Scripting Rhai) is ChaosNexus Forge's native, node-based programming interface. It allows users to orchestrate MCP workflows, string together native commands, and build complex agentic logic without writing a single line of code.

## The Dual-View Paradigm

Vhai operates entirely on a **Dual-View** architecture. Behind every visual node graph is a raw, executable [Rhai](https://rhai.rs/) script running in the ChaosNexus Anvil backend.

Unlike traditional visual scripting engines that compile to obscure byte-code, or a proprietary language, Vhai offers a 1:1 bidirectional synchronization between the visual canvas and the underlying script:

- **Connect nodes:** The Rhai code is instantly updated in real-time.
- **Write code:** The visual graph instantly rebuilds itself to reflect the new logic.

> [!TIP]
> **Performance Optimization**: For maximum efficiency, this real-time debounced sync only occurs when you are in split-pane mode. If you full-screen either the editor or the canvas, ChaosNexus Forge will fall back to a 5-second **Safety Auto-Save** to conserve processing power.

## Node Catalog

Vhai nodes are strictly categorized by their functionality. The catalog is accessible via the node palette or the context menu:

- **Events:** Triggers that initiate logic execution (e.g., `on_plugin_start`).
- **Control Flow:** Branches, loops, and logic gates (`If`, `While`, `For`).
- **Variables:** Setters and getters for scoped and global variables.
- **Native APIs:** Direct access to ChaosNexus Anvil's embedded functionality (e.g., HTTP, Database, FS).
- **MCP Mesh:** Nodes representing connected remote MCP tools and resources.

## Graph Anatomy

### Exec Pins (White)

Execution flow is dictated by the white, arrow-shaped **Exec Pins**. These determine the order in which nodes are evaluated. 

### Data Pins (Colored)

Data pins pass values between nodes. Their colors map strictly to the underlying data type they represent, making it easy to identify required inputs at a glance:

- **String:** Magenta
- **Integer:** Cyan
- **Boolean:** Red
- **Array:** Yellow
- **Map:** Blue

## Assembly & Execution

When a Vhai graph is saved, it is compiled down into standard Rhai AST (Abstract Syntax Tree). This means a visual script runs at the exact same native speed as a handwritten script, with absolutely zero overhead.

To understand how ChaosNexus Anvil executes this AST at runtime, read the [Vhai Execution Model](./execution) documentation.
