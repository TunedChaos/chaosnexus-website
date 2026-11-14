<!-- chaosnexus-website/.vitepress/theme/components/AiSearchSnippets.vue -->
<script setup lang="ts">
/**
 * Loads Cloudflare AI Search web components (search modal + optional bar)
 * when a real public endpoint base is configured in ai-search.ts.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import {
  AI_SEARCH_PUBLIC_ENDPOINT_BASE,
  aiSearchEnabled,
  aiSearchSnippetScriptUrl,
} from '../../ai-search'

const enabled = aiSearchEnabled()
const apiUrl = AI_SEARCH_PUBLIC_ENDPOINT_BASE
const scriptEl = ref<HTMLScriptElement | null>(null)

onMounted(() => {
  if (!enabled || typeof document === 'undefined') return
  const src = aiSearchSnippetScriptUrl()
  if (document.querySelector(`script[src="${src}"]`)) return
  const el = document.createElement('script')
  el.type = 'module'
  el.src = src
  el.async = true
  document.head.appendChild(el)
  scriptEl.value = el
})

onUnmounted(() => {
  // Leave the shared module script in place across VitePress client navigations.
})
</script>

<template>
  <div v-if="enabled" class="cn-ai-search" aria-hidden="false">
    <!-- Cmd/Ctrl+K modal: primary human search surface for AI Search. -->
    <search-modal-snippet
      :api-url="apiUrl"
      placeholder="Search ChaosNexus docs…"
      theme="auto"
      max-results="8"
    />
  </div>
</template>

<style>
.cn-ai-search {
  /* Align snippet chrome with ChaosNexus brand (theme-color / VitePress brand). */
  --search-snippet-primary-color: #0d7ce9;
  --search-snippet-border-radius: 8px;
}
</style>
