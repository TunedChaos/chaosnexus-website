import type MarkdownIt from 'markdown-it'
import yaml from 'yaml'

export function chaosCanvasPlugin(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.fence || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info.trim().startsWith('chaoscanvas')) {
      const info = token.info.trim()
      let mode = 'architecture'
      
      const modeMatch = info.match(/mode="([^"]+)"/)
      if (modeMatch) {
        mode = modeMatch[1]
      }

      try {
        const data = yaml.parse(token.content) || { nodes: [], edges: [] }
        
        // We use encodeURIComponent to safely pass the JSON payload through the Vue template compiler
        const payload = encodeURIComponent(JSON.stringify(data))
        
        return `<ChaosCanvas mode="${mode}" :data="JSON.parse(decodeURIComponent('${payload}'))" />\n`
      } catch (err: any) {
        console.error('Error parsing chaoscanvas yaml:', err)
        return `<div style="color: red; border: 1px solid red; padding: 10px;">Error parsing chaoscanvas block: ${err.message}</div>\n`
      }
    }
    return defaultRender(tokens, idx, options, env, self)
  }
}
