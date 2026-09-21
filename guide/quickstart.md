---
title: "ChaosNexus Quickstart"
description: "Download ChaosNexus Suite or build components from source."
---
# ChaosNexus Quickstart

## Overview

This quickstart gets you running **ChaosNexus** with minimal friction. Prefer the **Suite** installer when you want the full desktop stack in one download. Build from source (or clone component polyrepos) when you are developing or contributing.

ChaosNexus targets consumer hardware (roughly a mid-tier gaming laptop with ~8GB VRAM). It is intended for **developers, data analysts, and security researchers** who want a local-first, zero-trust agentic environment.

## Part 1: Download ChaosNexus Suite (recommended)

Suite packages ship **Forge** (IDE), supervised **Anvil**, **Codex**, **Crucible**, and a slim **Scripts** tree (demos such as `translation_test`, `terminal`, `time`, `http_get_demo`, …). GGUF models are **not** baked into the installer (Path 2): after install, use Settings → Models to download **ChaosNexus Tuned v1** (`TunedChaos/ChaosNexus_Tuned_v1-GGUF` / `ChaosNexus_Tuned_v1-Q4_K_M.gguf`) once you accept the license checkbox — or pick a local `.gguf`.

| Platform | Package |
|----------|---------|
| Linux | AppImage |
| Windows | Portable zip |
| macOS | `.app` / DMG |

**Canonical downloads:** [GitHub Releases – chaosnexus-suite](https://github.com/TunedChaos/chaosnexus-suite/releases) 
1. Download the artifact for your OS from a `suite-v*` Release.
2. Linux: `chmod +x ChaosNexus_Suite-*.AppImage` and run it. Windows: extract and run `ChaosNexus-Suite.bat`. macOS: open the `.app` (Gatekeeper may require right-click → Open for unsigned alpha builds).
3. Forge should open the bundled Scripts example workspace automatically when Suite env paths are present.

> **Alpha:** Windows SmartScreen and macOS Gatekeeper may warn until Authenticode / notarization land.

## Part 2: Advanced – build from source

Use this path for development. Prerequisites: Node.js with `pnpm`, Rust (`cargo`), and optionally a local model provider.

### Launch Anvil

```bash
cd chaosnexus-anvil
cargo run
```

### Open Forge

```bash
cd chaosnexus-forge
pnpm install
pnpm tauri dev
```

Connect Forge to `chaosnexus-scripts/plugins` (or the Suite `share/chaosnexus/scripts/plugins` tree). The published Scripts tree includes the `translation_test` hello-world example.

### Run Codex

```bash
cd chaosnexus-codex
cargo build --release
cargo run -- --help
```

### Pack Suite locally (workspace)

After component release builds have staged binaries under `artifacts/`:

```bash
just suite-release-linux    # or suite-release-windows / suite-release-macos
```

## Next steps

* [Repository architecture](/REPOSITORY_ARCHITECTURE) – GitHub public repositories, Suite Releases
* [Understand the Architecture](./concept-architecture)
* [Learn about Visual Scripting](./visual-scripting)
* [ChaosNexus Scripts usage](./chaosnexus-scripts/usage)
