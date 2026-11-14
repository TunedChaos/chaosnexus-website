---
title: "Visual Scripting"
description: "Documentation for Visual Scripting"
---
# Visual Scripting

ChaosNexus utilizes SvelteFlow to create a high-performance visual scripting interface.

## Node Graph Orchestration

Nodes in the graph represent discrete logical units (e.g. Rhai scripts, logic gates, or data transforms).

```chaoscanvas mode="vhai"
nodes:
  - id: evt_1
    label: "on_plugin_start"
    kind: "event"
  - id: scr_2
    label: "on_plugin_start"
    kind: "script"
    scriptBody: "register_mcp_tool(get_system_time);\nregister_mcp_tool(get_ntp_time);"
  - id: evt_3
    label: "on_all_plugins_loaded"
    kind: "event"
  - id: scr_4
    label: "on_all_plugins_loaded"
    kind: "script"
    scriptBody: "print(\"[time] Time plugin is ready!\");"
  - id: evt_execute
    label: "execute"
    kind: "event"
  - id: br_sys
    label: "get_system_time"
    kind: "branch"
  - id: br_ntp
    label: "get_ntp_time"
    kind: "branch"
  - id: fn_sys
    label: "get_system_time"
    kind: "function"
    fn: "get_system_time"
  - id: fn_ntp
    label: "get_ntp_time"
    kind: "function"
    fn: "get_ntp_time"
  - id: ret_unknown
    label: "Return"
    kind: "return"
edges:
  - source: evt_1
    target: scr_2
  - source: evt_3
    target: scr_4
  - source: evt_execute
    target: br_sys
  - source: br_sys
    target: fn_sys
    label: "true"
  - source: br_sys
    target: br_ntp
    label: "false"
  - source: br_ntp
    target: fn_ntp
    label: "true"
  - source: br_ntp
    target: ret_unknown
    label: "false"
```

## Hybrid UI Mechanics

The interface bridges native desktop interactions with web technologies. We adhere to the Svelte 5 Hybrid Keyboard/Mouse menu pattern to ensure deeply nested contextual menus and nodes remain entirely navigable regardless of input modality.
