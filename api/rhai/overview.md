---
title: "API Reference Overview"
description: "Documentation for API Reference Overview"
---
# API Reference Overview

The API reference for ChaosNexus is generated dynamically based on the underlying `chaos_schema.json` emitted by the Rust backend engine.

This ensures that the documentation for all Rhai scripts, modules, and available node handles is mathematically synchronized with the compiled application.

## Core Modules

The full, auto-generated reference is available in the **[Rhai API Reference index](./)**, with one page per module and per function. These pages are regenerated from `chaos_schema.json` every time the website is built (`pnpm website:build`), so they always match the compiled engine.
