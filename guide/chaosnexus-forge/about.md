---
title: "About ChaosNexus Forge"
description: "Documentation for About ChaosNexus Forge"
---
# About ChaosNexus Forge

ChaosNexus Forge is the official Frontend IDE and visual workspace for the Tuned Chaos ecosystem. Built as a desktop application using Tauri and Svelte 5, it provides a seamless interface to interact with the underlying ChaosNexus Anvil MCP Host Engine.

::: tip
ChaosNexus Forge is designed to feel like a modern, responsive IDE. If you are familiar with standard development environments, you will feel right at home.
:::

## What is ChaosNexus Forge?

At its core, ChaosNexus Forge is a lightweight, high-performance desktop application. It acts as the visual counterpart to the headless ChaosNexus Anvil engine, providing a rich set of interfaces for managing your workflow:

*   **Visual Workspace**: An interactive environment for managing your agents, workflows, and configurations.
*   **Real-time Monitoring**: Native integration with the backend to stream logs, metrics, and state changes as they happen.
*   **Plugin Management**: A dedicated interface for discovering, installing, and configuring MCP plugins.
*   **Script Editor**: Built-in editing capabilities for Rhai scripts, complete with syntax highlighting and validation.

## Architecture

ChaosNexus Forge follows a classic Tauri architecture, cleanly separating the frontend user interface from the backend logic. It focuses purely on presentation and user interaction, delegating backend tasks to the core engine.

## How to Launch

ChaosNexus Forge will ultimately be distributed via downloadable binary releases for ease of use. However, if you are building the application from source, you should build it for release to ensure optimal performance.

To build and launch the application, navigate to the `ChaosNexus Forge` directory and use your standard Tauri build pipeline, ensuring you are building the release target.
