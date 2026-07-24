// docs/.vitepress/config.ts
import { defineConfig, type DefaultTheme } from 'vitepress'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { chaosCanvasPlugin } from './plugins/chaoscanvas'
import Icons from 'unplugin-icons/vite'
import llmstxt from 'vitepress-plugin-llms'
import markdownItTaskLists from 'markdown-it-task-lists'

const __dirname = dirname(fileURLToPath(import.meta.url));
const apiSidebarPath = resolve(__dirname, 'api-sidebar.json');
let apiSidebarItems: DefaultTheme.SidebarItem[] = [];
if (existsSync(apiSidebarPath)) {
  try {
    apiSidebarItems = JSON.parse(readFileSync(apiSidebarPath, 'utf-8'));
  } catch (e) {
    console.warn("Failed to load api-sidebar.json", e);
  }
}

export default defineConfig({
  title: "ChaosNexus",
  description: "Sovereign, local-first agentic orchestration - Anvil, Forge, Codex, Crucible, and Scripts from Tuned Chaos LLC.",
  ignoreDeadLinks: false,
  markdown: {
    config: (md) => {
      md.use(chaosCanvasPlugin)
      // Render GitHub-style `- [ ]` / `- [x]` task lists (e.g. /roadmap).
      md.use(markdownItTaskLists, { enabled: true, label: true, labelAfter: true })
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#0D7CE9' }],
    // Site-wide defaults for Discord / X / Telegram / Slack link previews
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'ChaosNexus' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image', content: 'https://chaosnexus.ai/og-image.png' }],
    ['meta', { property: 'og:image:secure_url', content: 'https://chaosnexus.ai/og-image.png' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'ChaosNexus - sovereign local-first agentic orchestration' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://chaosnexus.ai/og-image.png' }],
    ['meta', { name: 'twitter:image:alt', content: 'ChaosNexus - sovereign local-first agentic orchestration' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local'
    },
    footer: {
      message: 'ChaosNexus is released under the <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">AGPLv3 License</a>. Contribute on <a href="https://codeberg.org/TunedChaos" target="_blank">Codeberg</a>.',
      copyright: 'Copyright © 2026 <a href="https://tunedchaos.com" target="_blank">Tuned Chaos LLC</a> | <a href="https://tunedchaos.dev" target="_blank">Dev Blog</a> | <a href="/guide/support">Support</a>'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Status', link: '/project_status_and_next_steps' },
      { text: 'Roadmap', link: '/roadmap' },
      { text: 'Security', link: '/context/security_model' },
      { text: 'Operations', link: '/operations/os_sandbox' },
      { text: 'Vhai', link: '/vhai/' },
      { text: 'Rhai API', link: '/api/rhai/' },
      { text: 'More',
        items: [
          { text: 'Licensing', link: '/guide/licensing' },
          { text: 'AI assistance disclosure', link: '/guide/ai-assistance' },
          { text: 'Contribute (Codeberg)', link: '/guide/contribute' },
          { text: 'Support', link: '/guide/support' },
          { text: 'Why local sandboxing', link: '/guide/why-local-sandboxing' },
          { text: 'Repository architecture', link: '/REPOSITORY_ARCHITECTURE' },
          { text: 'Attributions and licenses', link: '/guide/attributions/'}
        ]
      }
    ],
    socialLinks: [
      {
        icon: {
          // Codeberg mark (contribute primary)
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.955.49A12 12 0 0 0 0 12.49a12 12 0 0 0 1.865 6.373L11.877 23.5a.83.83 0 0 0 .25.05h.022a.83.83 0 0 0 .25-.05l10.01-4.637A12 12 0 0 0 24 12.49 12 12 0 0 0 11.955.49ZM8.996 14.99H6.49a.49.49 0 0 1-.49-.49V9.49a.49.49 0 0 1 .49-.49h2.506a.49.49 0 0 1 .49.49v4.99a.49.49 0 0 1-.49.49Zm8.508 0h-2.506a.49.49 0 0 1-.49-.49V9.49a.49.49 0 0 1 .49-.49h2.506a.49.49 0 0 1 .49.49v4.99a.49.49 0 0 1-.49.49Z"/></svg>'
        },
        link: 'https://codeberg.org/TunedChaos',
        ariaLabel: 'Codeberg'
      },
      { icon: 'github', link: 'https://github.com/TunedChaos', ariaLabel: 'GitHub mirrors' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'What is ChaosNexus?', link: '/guide/' },
            { text: 'Who is it for?', link: '/guide/who-is-it-for' },
            { text: 'What and Why (Our Story)', link: '/guide/what-and-why' },
            { text: 'Quickstart', link: '/guide/quickstart' },
            { text: 'Architecture Concept', link: '/guide/concept-architecture' },
            { text: 'Why local sandboxing', link: '/guide/why-local-sandboxing' },
            { text: 'Licensing', link: '/guide/licensing' },
            { text: 'AI assistance', link: '/guide/ai-assistance' },
            { text: 'Contribute', link: '/guide/contribute' },
            { text: 'Support', link: '/guide/support' }
          ]
        },
        {
          text: 'Component Guides',
          items: [
            {
              text: 'ChaosNexus Anvil',
              items: [
                { text: 'About', link: '/guide/chaosnexus-anvil/about' },
                { text: 'Getting Started', link: '/guide/chaosnexus-anvil/getting-started' },
                { text: 'Usage', link: '/guide/chaosnexus-anvil/usage' },
                { text: 'Configuration', link: '/guide/chaosnexus-anvil/configuration' },
                { text: 'Rhai API Reference', link: '/guide/chaosnexus-anvil/rhai-api' }
              ]
            },
            {
              text: 'ChaosNexus Forge',
              items: [
                { text: 'About', link: '/guide/chaosnexus-forge/about' },
                { text: 'Getting Started', link: '/guide/chaosnexus-forge/getting-started' },
                { text: 'Usage', link: '/guide/chaosnexus-forge/usage' }
              ]
            },
            {
              text: 'ChaosNexus Codex',
              items: [
                { text: 'About', link: '/guide/chaosnexus-codex/about' },
                { text: 'Getting Started', link: '/guide/chaosnexus-codex/getting-started' },
                { text: 'Usage', link: '/guide/chaosnexus-codex/usage' },
                { text: 'Configuration', link: '/guide/chaosnexus-codex/configuration' }
              ]
            },
            {
              text: 'ChaosNexus Crucible',
              items: [
                { text: 'About', link: '/guide/chaosnexus-crucible/about' },
                { text: 'Getting Started', link: '/guide/chaosnexus-crucible/getting-started' },
                { text: 'Usage', link: '/guide/chaosnexus-crucible/usage' },
                { text: 'Configuration', link: '/guide/chaosnexus-crucible/configuration' }
              ]
            },
            {
              text: 'ChaosNexus Scripts',
              items: [
                { text: 'About', link: '/guide/chaosnexus-scripts/about' },
                { text: 'Getting Started', link: '/guide/chaosnexus-scripts/getting-started' },
                { text: 'Usage', link: '/guide/chaosnexus-scripts/usage' },
                { text: 'Layout', link: '/guide/chaosnexus-scripts/layout' }
              ]
            }
          ]
        }
      ],
      '/vhai/': [
        {
          text: 'Vhai Visual Scripting',
          items: [
            { text: 'Overview', link: '/vhai/' },
            { text: 'Vhai Canvas', link: '/vhai/canvas' },
            { text: 'Vhai Execution', link: '/vhai/execution' }
          ]
        }
      ],
      '/context/': [
        {
          text: 'Security & Context',
          items: [
            { text: 'Active Context', link: '/context/active_context' },
            { text: 'Security Model', link: '/context/security_model' }
          ]
        }
      ],
      '/operations/': [
        {
          text: 'Deployment & Operations',
          items: [
            { text: 'OS Sandbox', link: '/operations/os_sandbox' }
          ]
        }
      ],
      '/api/rhai/': [
        {
          text: 'Rhai API Reference',
          items: apiSidebarItems
        }
      ],
    },
  },

  sitemap: {
    hostname: 'https://chaosnexus.ai'
  },
  transformPageData(pageData) {
    const siteDescription =
      'Sovereign, local-first agentic orchestration - Anvil, Forge, Codex, Crucible, and Scripts from Tuned Chaos LLC.'
    const title =
      pageData.frontmatter.title ||
      pageData.title ||
      'ChaosNexus'
    const description =
      pageData.frontmatter.description ||
      siteDescription
    const canonicalUrl = `https://chaosnexus.ai/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    )
  },
  vite: {
    plugins: [
      Icons({
        compiler: 'vue3'
      }),
      llmstxt()
    ],
    optimizeDeps: {
      include: ['dayjs'],
    },
    build: {
      chunkSizeWarningLimit: 16384,
    }
  },
})
