// chaosnexus-website/.vitepress/theme/index.ts
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ChaosCanvas from '../components/ChaosCanvas.vue'
import AlwaysAvailableFooter from './components/AlwaysAvailableFooter.vue'
import AiSearchSnippets from './components/AiSearchSnippets.vue'
import { registerChaosNexusWebMcpTools } from '../webmcp'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('ChaosCanvas', ChaosCanvas)
    // Cloudflare AI Search snippets register as custom elements (web components).
    app.config.compilerOptions.isCustomElement = (tag) =>
      tag.endsWith('-snippet')

    // WebMCP tools must register on first client paint for agent discovery scanners.
    if (typeof window !== 'undefined') {
      void registerChaosNexusWebMcpTools({ router })
    }
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () =>
        h('div', null, [h(AlwaysAvailableFooter), h(AiSearchSnippets)]),
    })
  },
}
