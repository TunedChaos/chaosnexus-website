import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ChaosCanvas from '../components/ChaosCanvas.vue'
import AlwaysAvailableFooter from './components/AlwaysAvailableFooter.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ChaosCanvas', ChaosCanvas)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(AlwaysAvailableFooter)
    })
  }
}

