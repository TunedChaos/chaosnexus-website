---
title: "Who is it for?"
description: "Documentation for Who is it for?"
---
<!-- docs/guide/who-is-it-for.md -->
# Who is it for?

**ChaosNexus** is designed for developers, systems engineers, and data professionals who require a private, secure, and highly customizable environment for AI agent execution.

Whether you are running a local model on a single machine to safeguard sensitive data, building dynamic plugins on the fly, or extracting records for audit compliance, ChaosNexus provides the specialized framework you need.

---

## 1. Privacy-First & Zero-Trust Developers

If your code or data is bound by intellectual property restrictions, client NDAs, or compliance mandates, you cannot afford to feed raw terminal access or files to cloud-based AI agent systems. 
*   **The Problem**: Traditional agent platforms execute unverified code directly on your system shell, risking system takeover or silent data leakage.
*   **The ChaosNexus Solution**: The core engine (ChaosNexus Anvil) executes inside a rigid, sandboxed environment. File accesses are constrained to designated plugin directories. Any shell execution or network requests outside the defaults are intercepted and queued inside the Tauri desktop IDE (ChaosNexus Forge), requiring manual developer approval before they run.

## 2. Hardware-Constrained & Local-LLM Enthusiasts

You do not need a multi-GPU server rack to run a self-sufficient agent.
*   **The Problem**: Modern developer agents rely heavily on large, expensive commercial APIs. When run locally, general LLMs suffer from severe api hallucinations or ballooning context sizes, necessitating huge amounts of VRAM.
*   **The ChaosNexus Solution**: ChaosNexus Tuned leverages Unsloth to compile custom datasets based on the engine's exact schema contract. This allows you to fine-tune highly compact, quantized open-source models (such as Granite-4.1-8B) to write flawless Rhai plugin scripts under **6GB of VRAM**. Mixed with our local context-reduction oracles (ChaosNexus Codex/ChaosData), token usage is kept small enough to run entirely on a standard consumer laptop.

## 3. Rapid Prototypers & Extensible System Builders

If you are tired of rebooting your agent or editor every time you tweak a tool.
*   **The Problem**: Adding capabilities to existing agent platforms requires recompiling custom python libraries, re-initializing dev-servers, or reloading the editor workspace.
*   **The ChaosNexus Solution**: Inspired by game engine plugin managers (like SourceMod), ChaosNexus Anvil features on-the-fly hot-reloading. You can edit a Rhai plugin in Monaco, and the backend engine instantly hot-reloads it without closing the session. Outbound MCP connections allow you to dynamically link external tools into a unified mesh on demand.

## 4. Data Analysts, Extractors, & E-Discovery Professionals

For compliance, corporate, and legal environments where data sovereignty is legally mandated.
*   **The Problem**: Processing sensitive corporate data (such as legal records, financial ledgers, or customer information) requires deep extraction and analysis. Sending this data to external APIs is a massive compliance risk. Moreover, general AI agents can behave unpredictably, leading to non-deterministic parsing.
*   **The ChaosNexus Solution**:
    *   **Secure SQLite/PostgreSQL/MySQL Integration**: Read and write data locally using SeaORM.
    *   **E-Discovery Utility**: ChaosNexus Codex and ChaosData act as local context-reduction oracles. They index massive folders of raw legal documents or database tables and return only the exact snippets required for the analysis, keeping processing private and local.
    *   **Deterministic Workflows**: By running custom, sandboxed Rhai script plugins, you can dictate the exact rules of document extraction, ensuring the LLM acts as a predictable, deterministic processing unit.
