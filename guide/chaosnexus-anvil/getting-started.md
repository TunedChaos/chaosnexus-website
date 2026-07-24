# Getting Started with ChaosNexus Anvil

ChaosNexus Anvil is the high-performance Rust engine and Model Context Protocol (MCP) server that powers the backend of ChaosNexus. It is responsible for executing the Rhai scripts that interact with your local system.

## Prerequisites

Before building ChaosNexus Anvil, ensure you have the following installed:
- **Rust and Cargo**: The official Rust toolchain.
- **C/C++ Build Tools**: Required for compiling certain native extensions.

*Note: ChaosNexus Anvil is designed to run efficiently on Linux (including CachyOS/Arch), macOS, and Windows.*

## Building from Source

Currently, the primary way to use ChaosNexus Anvil is to build it directly from the source code.

1. **Clone the Repository:**
   ```bash
   git clone <your-repo-url>
   cd chaosnexus-anvil
   ```

2. **Build the Engine:**
   ```bash
   cargo build --release
   ```
   The compiled binary will be located at `target/release/anvil`.

## Running the Server

ChaosNexus Anvil operates as an MCP server. By default, when started, it communicates over standard I/O (stdio) which allows AI tools like Claude Desktop or Cursor to interface directly with it.

```bash
./target/release/anvil --scripts-dir /path/to/your/scripts
```

If you do not specify a `--scripts-dir`, it will attempt to use a default `chaosnexus-scripts/` directory relative to the binary or your current working directory (monorepo layout). Override with `scripts_dir` in host TOML.

## Connecting to an LLM

To allow your AI assistant to run local scripts, you need to configure your AI client to spawn the ChaosNexus Anvil MCP server.

### Claude Desktop Configuration

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "chaosnexus-anvil": {
      "command": "/absolute/path/to/chaosnexus-anvil/target/release/anvil",
      "args": ["--scripts-dir", "/absolute/path/to/your/scripts"]
    }
  }
}
```

### Cursor Configuration

In Cursor, go to **Settings > Features > MCP**, and add a new server using the exact absolute path to your `chaosnexus-anvil` binary.

## Next Steps
- Learn how to write scripts in the [Rhai API Reference](/api/rhai/).
- Understand how to configure the engine in the [Configuration Guide](./configuration.md).
