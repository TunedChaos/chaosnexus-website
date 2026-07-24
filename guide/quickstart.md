---
title: "ChaosNexus Quickstart"
description: "Quickstart guide for ChaosNexus, optimized for consumer hardware."
---
# ChaosNexus Quickstart

## Overview

This quickstart guides you through setting up **ChaosNexus**, a local-first, zero-trust agentic development environment. ChaosNexus is designed to be fully runnable on consumer hardware, down to a mid-tier gaming laptop with an ~8GB mobile GPU. Our goal is to maintain a **low cognitive cost-of-entry**, getting you up and running with minimal friction.

In this quickstart, you will learn how to:

* [Part 1: Launch the Execution Engine (ChaosNexus Anvil)](#part-1-launch-chaosnexus-anvil)
* [Part 2: Open the Control Desk (ChaosNexus Forge)](#part-2-open-chaosnexus-forge)
* [Part 3: Run the AI Context Oracles (ChaosNexus Codex)](#part-3-run-the-context-oracles)

It is intended for **Developers, Data Analysts, and Security Researchers** who want a safe, local AI coding environment. It assumes you have basic knowledge of terminal commands and understand what a local LLM is.

## Before you start

Before running this quickstart, ensure you have the following hardware and software prerequisites:

* **Hardware:** A machine with at least 16GB of RAM and an ~8GB VRAM GPU (a mid-tier gaming laptop is perfectly viable).
* **Software:** Node.js (with `pnpm`), Rust (`cargo`), and an installed local model provider like Ollama or LM Studio.

## Part 1: Launch ChaosNexus Anvil

ChaosNexus Anvil is the secure execution engine. It intercepts AI tool calls and executes them inside a sandboxed Rhai scripting environment, ensuring the AI cannot execute arbitrary shell commands without your explicit permission.

### Step 1: Start the Anvil Server

Open your terminal, navigate to the Anvil directory, and start the Rust server:

```bash
cd chaosnexus-anvil
cargo run
```

You should see the server boot up and initialize the local SQLite database.

## Part 2: Open ChaosNexus Forge

ChaosNexus Forge is your desktop IDE and visual interceptor. When an AI generates a new script for Anvil, Forge quarantines it until you visually inspect and approve it.

### Step 1: Install and Run Forge

Open a new terminal window, navigate to the Forge directory, install dependencies, and launch the Tauri app:

```bash
cd chaosnexus-forge
pnpm install
pnpm tauri dev
```

The graphical interface will appear, offering a dual-view editor (Monaco text editor and Svelte Flow visual canvas).

## Part 3: Run the Context Oracles

To keep token usage low, ChaosNexus relies on "Oracles" like ChaosNexus Codex to fetch specific documentation snippets.

### Step 1: Launch Codex

Navigate to the Codex directory, build, and run the oracle:

```bash
cd chaosnexus-codex
cargo build --release
cargo run -- fetch
```

Codex is a Rust MCP/CLI tool. Prefer `cargo run -- --help` to see available subcommands for your install.
## Next steps

Now that your local agentic environment is running safely on your machine, try these next steps to explore its capabilities:

* [Understand the Architecture](./concept-architecture)
* [Learn about Visual Scripting](./visual-scripting)
* [Discover How and Why ChaosNexus was Built](./what-and-why)
