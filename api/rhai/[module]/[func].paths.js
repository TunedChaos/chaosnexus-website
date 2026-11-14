import fs from 'fs'
import path from 'path'

export default {
  paths() {
    const schemaPath = path.resolve(__dirname, '../../../../../chaosnexus-anvil/.chaoswrench_data/chaos_schema.json')
    let schema = { modules: [] }
    
    try {
      if (fs.existsSync(schemaPath)) {
        schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'))
      } else {
        schema = {
          modules: [
            {
              name: 'core',
              functions: [
                { name: 'init', description: 'Initializes the core system.', params: ['config'] },
                { name: 'shutdown', description: 'Safely shuts down the router.', params: [] }
              ]
            }
          ]
        }
      }
    } catch (e) {
      console.warn("Failed to load chaos_schema.json, using empty schema.")
    }

    const paths = []
    
    for (const mod of schema.modules) {
      for (const func of mod.functions) {
        paths.push({
          params: {
            module: mod.name,
            func: func.name
          },
          content: `
# \`${func.name}()\`

**Module:** \`${mod.name}\`

${func.description}

### Parameters

${func.params && func.params.length > 0 ? func.params.map(p => `- \`${p}\``).join('\n') : '*None*'}
          `
        })
      }
    }

    return paths
  }
}
