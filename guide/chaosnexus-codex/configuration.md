---
title: "ChaosNexus Codex Configuration"
description: "How to configure ChaosNexus Codex via TOML"
---

# ChaosNexus Codex Configuration

ChaosNexus Codex manages ambient documentation libraries. It ingests markdown documentation from local folders or remote Git repositories so that the agent can read and search them.

If a configuration file is missing when the server starts, it will automatically generate a boilerplate configuration file in its working directory.

**Configuration File**: `chaosnexus-codex.toml`

### Example Boilerplate
```toml
# ChaosNexus Codex Configuration
# This file tells chaosnexus-codex which documentation repositories to fetch and serve.

# storage_path = "~/.local/share/chaosnexus-codex/data" # Uncomment to override the default storage path.
# port = 3000 # Uncomment to run as an SSE HTTP server on the given port by default
# default_offset = 0 # Default character offset for reading documentation pages
# default_limit = 16000 # Default maximum character limit for reading documentation pages

# Example: TypeScript
# [[libraries]]
# repo_url = "https://github.com/microsoft/TypeScript-Website.git"
# sub_dir = "packages/documentation/copy/en"
# dst_folder = "typescript"
# use_sparse = false
```

### Key Concepts
- **Libraries**: Each `[[libraries]]` entry defines a documentation source.
- **Storage**: By default, documentation is cached locally in the user's `share` directory.
