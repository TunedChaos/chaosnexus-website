# auth.md

> ChaosNexus agent authentication discovery for https://chaosnexus.ai

## Audience

AI agents and tools that consume ChaosNexus **public documentation** and the **docs AI Search MCP**. Human developers registering for future protected commercial APIs.

## Summary

| Resource | Auth required today |
|----------|---------------------|
| Docs site (chaosnexus.ai), /llms.txt, sitemap, Rhai API docs | **No** - anonymous public read |
| Cloudflare AI Search MCP | **No** - anonymous public search |
| Future commercial / private APIs | OAuth 2.0 / OIDC (discoverable below) |

Software and docs are **AGPL-3.0-or-later**. See [Licensing](https://chaosnexus.ai/guide/licensing).

## Anonymous public access

Call documentation and MCP endpoints **without** an Authorization header.

```http
GET /guide/ai-agents HTTP/1.1
Host: chaosnexus.ai
Accept: text/markdown
```

```http
POST /mcp HTTP/1.1
Host: 03de9872-58ee-48b3-be11-a2103412dce4.search.ai.cloudflare.com
Content-Type: application/json
```

If an OAuth client still probes token endpoints, they return a clear error pointing here. Prefer anonymous access for public resources.

## OAuth / OIDC discovery

| Document | URL |
|----------|-----|
| OAuth 2.0 Authorization Server Metadata (RFC 8414) | https://chaosnexus.ai/.well-known/oauth-authorization-server |
| OpenID Connect Discovery | https://chaosnexus.ai/.well-known/openid-configuration |
| OAuth Protected Resource Metadata (RFC 9728) | https://chaosnexus.ai/.well-known/oauth-protected-resource |
| JWKS | https://chaosnexus.ai/.well-known/jwks.json |

- Issuer: https://chaosnexus.ai
- Authorization endpoint: https://chaosnexus.ai/oauth/authorize
- Token endpoint: https://chaosnexus.ai/oauth/token
- Registration endpoint: https://chaosnexus.ai/oauth/register
- Scopes (planned / reserved): docs:read, search:read
- Grant types advertised: authorization_code, client_credentials

Public docs do **not** currently mint access tokens. JWKS may be empty until a signing key is published for protected APIs.

## Agent registration

No account provisioning is required for public docs or AI Search MCP.

For commercial embedding without AGPL obligations, contact Tuned Chaos via [Support](https://chaosnexus.ai/guide/support) / licensing - that path is contractual, not OAuth client registration.

```json
{
  "agent_auth": {
    "skill": "https://chaosnexus.ai/auth.md",
    "register_uri": "https://chaosnexus.ai/oauth/register",
    "claim_uri": "https://chaosnexus.ai/oauth/claim",
    "identity_types_supported": ["anonymous"],
    "anonymous": {
      "credential_types_supported": ["claim_token"],
      "claim_uri": "https://chaosnexus.ai/oauth/claim"
    }
  }
}
```

## Related

- [AI agents guide](https://chaosnexus.ai/guide/ai-agents)
- [Privacy (AI Search)](https://chaosnexus.ai/guide/privacy)
- [API catalog](https://chaosnexus.ai/.well-known/api-catalog)
