---
title: "Using ChaosNexus Forge"
description: "Documentation for Using ChaosNexus Forge"
---
# Using ChaosNexus Forge

ChaosNexus Forge acts as your primary visual workbench for orchestrating AI agents and Model Context Protocol workflows. It offers a dual-editor experience that bridges the gap between visual node graphs and underlying code logic.

## The Dual-Editor Canvas

When you launch ChaosNexus Forge, you will be presented with a split view. This interface allows you to visually wire up your MCP components, Rhai scripts, and agent pipelines using a rich interactive graph canvas. Simultaneously, you can edit the raw underlying code in the code pane. Changes made in the visual graph will instantly reflect in the code, and vice versa.

## Connecting to ChaosNexus Anvil

While ChaosNexus Forge functions as a standalone IDE, its true power is unlocked when connected to your local instance of ChaosNexus Anvil. By linking the two applications, you can:

*   Visually inspect the active Abstract Syntax Trees (ASTs) within the Rhai engine.
*   Review and monitor currently running plugins.
*   Trace live data flows directly from the graphical user interface.

Because ChaosNexus Forge enforces a strict zero-trust model, all of these interactions happen exclusively on your local hardware. No telemetry or code is sent to external cloud providers.
