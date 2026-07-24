# Getting Started with ChaosNexus Forge

ChaosNexus Forge is the desktop IDE (built with Tauri and Svelte) that provides a visual environment for building, managing, and hot-reloading your Rhai scripts and MCP configurations.

## Prerequisites

Before building ChaosNexus Forge, ensure you have the following installed:
- **Rust and Cargo**: The official Rust toolchain.
- **Node.js and pnpm**: The JavaScript runtime and package manager (Tuned Chaos strictly prefers `pnpm`).
- **Tauri OS Dependencies**: Linux requires specific system dependencies (e.g., `webkit2gtk`). Please follow the [Tauri Prerequisites Guide](https://tauri.app/v1/guides/getting-started/prerequisites) for your operating system.

*Note: ChaosNexus Forge is designed for Linux, macOS, and Windows desktop environments.*

## Building from Source

1. **Clone the Repository:**
   ```bash
   git clone <your-repo-url>
   cd chaosnexus-forge
   ```

2. **Install JavaScript Dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the Development Server:**
   ```bash
   pnpm tauri dev
   ```
   This command will compile the Svelte frontend, build the Rust Tauri backend, and launch the ChaosNexus Forge desktop application.

## First Launch: The Workspace

When ChaosNexus Forge opens, it acts as a control center for your local Agentic Logic. 

### The Workspace Directory
ChaosNexus Forge doesn't use a standard file explorer like VS Code. Instead, it expects to operate on a `scripts/` or `plugins/` directory containing `plugin.toml` files. Ensure you have initialized or opened a valid script directory.

### The Dual-View Editor
- **Left Pane (Monaco Editor):** This is where you write the raw Rhai code.
- **Right Pane (Svelte Flow):** This is the visual node graph, which provides a higher-level structural view of your script logic. (Map vs. Manual concept).

### The Live Control Desk
At the bottom of the window is the Control Desk drawer. Here you can:
- Start, Stop, or Reload the embedded ChaosNexus Anvil engine.
- View live engine and execution logs.
- Manage active MCP plugins.

## Next Steps
- Learn how to navigate the IDE in the [ChaosNexus Forge Usage Guide](./usage.md).
- Dive into Zero-Trust configurations in the [Security documentation](/context/security_model).
