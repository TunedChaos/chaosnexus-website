// chaosnexus-website/.vitepress/ai-search.ts
/**
 * Cloudflare AI Search public endpoint config for chaosnexus.ai docs.
 *
 * PUBLIC_ENDPOINT_BASE is the host from AI Search → Settings → Public Endpoint
 * (https://<id>.search.ai.cloudflare.com). Update after creating/rotating the
 * instance; do not commit API tokens.
 */

/** Instance name in the Cloudflare account (Wrangler / dashboard). */
export const AI_SEARCH_INSTANCE_NAME = 'chaosnexus'

/**
 * Public endpoint base URL (trailing slash). Empty disables UI snippets until
 * the instance public endpoint is provisioned and this constant is filled in.
 */
export const AI_SEARCH_PUBLIC_ENDPOINT_BASE =
  'https://03de9872-58ee-48b3-be11-a2103412dce4.search.ai.cloudflare.com/'

/** Snippet library version served from the public endpoint assets path. */
export const AI_SEARCH_SNIPPET_VERSION = 'v0.0.25'

export function aiSearchEnabled(): boolean {
  return (
    AI_SEARCH_PUBLIC_ENDPOINT_BASE.length > 0 &&
    !AI_SEARCH_PUBLIC_ENDPOINT_BASE.includes('PLACEHOLDER')
  )
}

export function aiSearchSnippetScriptUrl(): string {
  const base = AI_SEARCH_PUBLIC_ENDPOINT_BASE.replace(/\/$/, '')
  return `${base}/assets/${AI_SEARCH_SNIPPET_VERSION}/search-snippet.es.js`
}

export function aiSearchMcpUrl(): string {
  return `${AI_SEARCH_PUBLIC_ENDPOINT_BASE.replace(/\/$/, '')}/mcp`
}
