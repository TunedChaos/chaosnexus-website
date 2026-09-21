---
title: "Using ChaosNexus Codex"
description: "Documentation for Using ChaosNexus Codex"
---
# Using ChaosNexus Codex

ChaosNexus Codex operates as a dedicated Model Context Protocol server that provides localized semantic search, document parsing, and Retrieval-Augmented Generation capabilities to your AI agents.

## MCP Configuration

To utilize ChaosNexus Codex, you must add it to your primary MCP host (such as ChaosNexus Anvil or a desktop client). Configure the host to execute the ChaosNexus Codex binary over standard input and output streams.

An example configuration snippet:

```json
{
  "mcpServers": {
    "ChaosNexus Codex": {
      "command": "ChaosNexus Codex",
      "args": []
    }
  }
}
```

## Provided Tools

Once connected, ChaosNexus Codex will automatically expose a suite of specialized tools to the host environment:

*   **Local Document Ingestion**: Tools to safely parse and chunk your local markdown, text files, and documentation repositories.
*   **Zero-Knowledge Retrieval**: Tools that allow the agent to perform local semantic searches across the ingested knowledge base, ensuring no proprietary information leaks to external APIs.
