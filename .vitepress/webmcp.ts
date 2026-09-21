// chaosnexus-website/.vitepress/webmcp.ts
/**
 * WebMCP (browser Model Context) tools for chaosnexus.ai.
 *
 * Uses the imperative registerTool API (navigator/document.modelContext).
 * provideContext() was removed from the WebMCP draft; do not use it.
 *
 * @see https://webmachinelearning.github.io/webmcp/
 * @see https://isitagentready.com/.well-known/agent-skills/webmcp/SKILL.md
 */

import '@mcp-b/webmcp-polyfill'
import { AI_SEARCH_PUBLIC_ENDPOINT_BASE, aiSearchEnabled } from './ai-search'

const REGISTRY_FLAG = '__chaosnexusWebMcpRegistered'

type ModelContextLike = {
  registerTool: (
    tool: {
      name: string
      description: string
      inputSchema?: Record<string, unknown>
      execute: (input: Record<string, unknown>) => unknown | Promise<unknown>
      annotations?: Record<string, unknown>
    },
    options?: { signal?: AbortSignal },
  ) => Promise<void> | void
}

type VitePressRouter = {
  go: (href: string) => Promise<void> | void
}

function getModelContext(): ModelContextLike | null {
  if (typeof window === 'undefined') return null
  const docCtx = (document as Document & { modelContext?: ModelContextLike })
    .modelContext
  const navCtx = (navigator as Navigator & { modelContext?: ModelContextLike })
    .modelContext
  // Prefer navigator for scanners that specifically probe navigator.modelContext;
  // fall back to document.modelContext (current Chromium preference).
  const ctx = navCtx ?? docCtx
  if (!ctx || typeof ctx.registerTool !== 'function') return null
  return ctx
}

function textResult(text: string) {
  return { content: [{ type: 'text' as const, text }] }
}

function normalizeDocsPath(path: string): string | null {
  const trimmed = path.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed)
      if (url.origin !== 'https://chaosnexus.ai' && url.origin !== window.location.origin) {
        return null
      }
      return `${url.pathname}${url.search}${url.hash}` || '/'
    } catch {
      return null
    }
  }
  if (!trimmed.startsWith('/')) return null
  if (trimmed.startsWith('//')) return null
  return trimmed
}

/**
 * Register ChaosNexus docs tools once per browser tab.
 * AbortController unregisters tools when the page is fully unloaded.
 */
export async function registerChaosNexusWebMcpTools(options?: {
  router?: VitePressRouter
}): Promise<void> {
  if (typeof window === 'undefined') return
  const win = window as Window & { [REGISTRY_FLAG]?: boolean }
  if (win[REGISTRY_FLAG]) return

  const modelContext = getModelContext()
  if (!modelContext) {
    console.warn('[WebMCP] modelContext.registerTool unavailable')
    return
  }

  const controller = new AbortController()
  const signal = controller.signal
  const router = options?.router
  const searchBase = AI_SEARCH_PUBLIC_ENDPOINT_BASE.replace(/\/$/, '')

  const tools: Array<{
    name: string
    description: string
    inputSchema: Record<string, unknown>
    execute: (input: Record<string, unknown>) => unknown | Promise<unknown>
    annotations?: Record<string, unknown>
  }> = [
    {
      name: 'search_docs',
      description:
        'Search ChaosNexus documentation (guides, Rhai API, architecture, licensing) via Cloudflare AI Search. Prefer this before guessing paths.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Natural-language or keyword search query',
          },
          limit: {
            type: 'number',
            description: 'Max result chunks to return (1-10, default 5)',
            minimum: 1,
            maximum: 10,
          },
        },
        required: ['query'],
      },
      annotations: { readOnlyHint: true },
      async execute(input) {
        const query = String(input.query ?? '').trim()
        if (!query) return textResult('Error: query is required')
        if (!aiSearchEnabled()) {
          return textResult(
            'AI Search is not configured. Use https://chaosnexus.ai/llms.txt or https://chaosnexus.ai/guide/ai-agents',
          )
        }
        const limit = Math.min(10, Math.max(1, Number(input.limit) || 5))
        const res = await fetch(`${searchBase}/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ query }),
        })
        if (!res.ok) {
          return textResult(`Search failed with HTTP ${res.status}`)
        }
        const data = (await res.json()) as {
          success?: boolean
          result?: {
            chunks?: Array<{
              score?: number
              text?: string
              item?: { key?: string }
            }>
          }
        }
        const chunks = data.result?.chunks ?? []
        const results = chunks.slice(0, limit).map((chunk) => ({
          url: chunk.item?.key ?? null,
          score: chunk.score ?? null,
          excerpt: (chunk.text ?? '').replace(/\s+/g, ' ').trim().slice(0, 480),
        }))
        return textResult(
          JSON.stringify(
            {
              query,
              count: results.length,
              results,
              hint: 'Cite result URLs. Software is AGPL-3.0-or-later; see /guide/licensing.',
            },
            null,
            2,
          ),
        )
      },
    },
    {
      name: 'navigate_to',
      description:
        'Navigate this VitePress docs site to a same-origin path (for example /guide/quickstart or /api/rhai/).',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Same-origin path or https://chaosnexus.ai/... URL',
          },
        },
        required: ['path'],
      },
      annotations: { readOnlyHint: false },
      async execute(input) {
        const path = normalizeDocsPath(String(input.path ?? ''))
        if (!path) {
          return textResult(
            'Error: path must be a same-origin docs path (e.g. /guide/ai-agents)',
          )
        }
        if (router?.go) {
          await router.go(path)
        } else {
          window.location.assign(path)
        }
        return textResult(`Navigated to ${path}`)
      },
    },
    {
      name: 'get_discovery_info',
      description:
        'Return ChaosNexus agent discovery endpoints (llms.txt, MCP Server Card, Agent Skills index, Web Bot Auth directory, OAuth/auth.md).',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      execute() {
        return textResult(
          JSON.stringify(
            {
              origin: 'https://chaosnexus.ai',
              llmsTxt: 'https://chaosnexus.ai/llms.txt',
              llmsFullTxt: 'https://chaosnexus.ai/llms-full.txt',
              aiAgentsGuide: 'https://chaosnexus.ai/guide/ai-agents',
              authMd: 'https://chaosnexus.ai/auth.md',
              mcpServerCard:
                'https://chaosnexus.ai/.well-known/mcp/server-card.json',
              mcpUrl: `${searchBase}/mcp`,
              agentSkillsIndex:
                'https://chaosnexus.ai/.well-known/agent-skills/index.json',
              webBotAuthDirectory:
                'https://chaosnexus.ai/.well-known/http-message-signatures-directory',
              signatureAgent: '"https://chaosnexus.ai"',
              apiCatalog: 'https://chaosnexus.ai/.well-known/api-catalog',
              license: 'AGPL-3.0-or-later',
            },
            null,
            2,
          ),
        )
      },
    },
    {
      name: 'get_current_page',
      description:
        'Return the current docs page URL, title, and a short description for context.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      execute() {
        const desc =
          document
            .querySelector('meta[name="description"]')
            ?.getAttribute('content') ?? null
        return textResult(
          JSON.stringify(
            {
              url: window.location.href,
              path: window.location.pathname,
              title: document.title,
              description: desc,
            },
            null,
            2,
          ),
        )
      },
    },
  ]

  for (const tool of tools) {
    await modelContext.registerTool(tool, { signal })
  }

  // Also register on the alternate surface when both exist and differ
  // (scanner probes navigator; Chromium prefers document).
  const docCtx = (document as Document & { modelContext?: ModelContextLike })
    .modelContext
  const navCtx = (navigator as Navigator & { modelContext?: ModelContextLike })
    .modelContext
  if (docCtx && navCtx && docCtx !== navCtx) {
    for (const tool of tools) {
      try {
        await docCtx.registerTool(tool, { signal })
      } catch {
        // Already registered or incompatible; ignore.
      }
    }
  }

  win[REGISTRY_FLAG] = true
  window.addEventListener(
    'pagehide',
    () => {
      controller.abort()
      win[REGISTRY_FLAG] = false
    },
    { once: true },
  )
}
