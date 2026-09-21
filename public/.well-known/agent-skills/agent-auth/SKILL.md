---
name: agent-auth
description: Discover ChaosNexus agent authentication via auth.md and OAuth/OIDC well-known metadata. Use when connecting to chaosnexus.ai docs or MCP and you need to know whether Bearer tokens are required.
---

# Implement Auth.md Agent Registration Discovery

ChaosNexus publishes `/auth.md` and OAuth/OIDC discovery for agent authentication.

## Requirements

- Serve `/auth.md` with an H1 containing `auth.md`
- Publish `/.well-known/oauth-protected-resource` (RFC 9728)
- Publish `/.well-known/oauth-authorization-server` (RFC 8414) and/or `/.well-known/openid-configuration`
- Include `agent_auth` with `skill`, `register_uri`, and at least one identity method

## ChaosNexus notes

Public documentation and the docs AI Search MCP use **anonymous** access (no Bearer token). OAuth endpoints exist for discovery and future protected APIs; token issuance for public resources is intentionally denied with a pointer to `/auth.md`.

See https://chaosnexus.ai/auth.md and https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md
