---
title: "About ChaosNexus Codex"
description: "Documentation for About ChaosNexus Codex"
---

### The Codex Paradigm

Big Tech melts GPUs in multi-billion-dollar datacenters trying to build a monolithic "know-it-all." They force a model to memorize the world just to perform a single task.

We don't buy into that waste.

When your local model needs to know more, **you hand it a book.**

By running **ChaosNexus Codex**, you bypass the context window arms race. You give your lean, local agent precise, deterministic access to the exact documentation, APIs, and datasets required for the job at hand.

Because Codex is completely multi-instance, you can spin up dedicated libraries for dedicated tasks:

* **Database Engineering?** Load the exact target SQL schema.
* **Data Science?** Feed it specific R scripting documentation.
* **Deep Troubleshooting?** Drop in the exact system API manuals.
* **Niche Trivia?** Drop in the flight physics of an unladen swallow.

Your model stays under 6 GB of VRAM, your data never leaves your machine, and your agent only knows exactly what you choose to teach it.

# About ChaosNexus Codex

ChaosNexus Codex is a dedicated Model Context Protocol server that manages documentation for the Tuned Chaos ecosystem.

## Vision

Documentation is a critical component of any complex system. ChaosNexus Codex leverages the MCP standard to make documentation interactive and programmatically accessible to agents and tools across the ecosystem. 

## Key Features

*   **Protocol Native**: Exposes documentation generation and retrieval capabilities directly over the standard Model Context Protocol.
*   **Integration**: Designed to hook into your existing AI workflows, providing agents with immediate, context-aware access to documentation structures.

## Distribution and Launching

ChaosNexus Codex offers two distinct distribution models depending on your desired deployment strategy:

*   **Pre-compiled Releases**: If you download a pre-built release binary of ChaosNexus Codex, it operates strictly in a dynamic mode. In this mode, it can only download and reference documentation files dynamically from your local drive or configured network sources at runtime.
*   **Source Compilation**: If you compile ChaosNexus Codex from source, you gain the ability to configure the server ahead of time. This allows you to compile the documentation assets directly into the resulting binary itself, creating a completely self-contained executable.

To build the executable from source (with or without embedded documentation), navigate to the `ChaosNexus Codex` directory and execute:

```bash
cargo build --release
```

After the build completes, or after you download a pre-compiled release, configure the executable path within your preferred agent software that supports standard MCP servers.
