<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import IconLucideX from '~icons/lucide/x'

const searchQuery = ref('')

function filterApi() {
  const query = searchQuery.value.toLowerCase().trim()
  const modules = document.querySelectorAll('.api-module')
  
  modules.forEach(moduleEl => {
    let hasVisibleFunctions = false
    const functions = moduleEl.querySelectorAll('.api-function')
    
    functions.forEach(funcEl => {
      const funcName = funcEl.getAttribute('data-name').toLowerCase()
      // We also replace underscores with spaces/hyphens conceptually if user types them,
      // but let's just do a simple substring match
      if (query === '' || funcName.includes(query)) {
        funcEl.style.display = 'block'
        hasVisibleFunctions = true
      } else {
        funcEl.style.display = 'none'
      }
    })
    
    // Hide the entire module if no functions match
    if (hasVisibleFunctions) {
      moduleEl.style.display = 'block'
      
      // Hide the module headers and descriptions if a search is active to reduce noise
      const moduleChildren = Array.from(moduleEl.children)
      if (query !== '') {
        moduleChildren.forEach(child => {
          if (!child.classList.contains('api-function')) {
            child.style.display = 'none'
          }
        })
      } else {
        moduleChildren.forEach(child => {
          if (!child.classList.contains('api-function')) {
            child.style.display = ''
          }
        })
      }
    } else {
      moduleEl.style.display = 'none'
    }
  })
}

watch(searchQuery, filterApi)

let ignoreHashChange = false

function onHashChange() {
  if (ignoreHashChange) {
    ignoreHashChange = false
    return
  }
  if (window.location.hash) {
    // newHash looks like "#base64_decode"
    searchQuery.value = window.location.hash.slice(1)
  } else {
    searchQuery.value = ''
  }
}

onMounted(() => {
  window.addEventListener('hashchange', onHashChange)
  // Check initial hash on direct page load
  onHashChange()
  filterApi()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange)
})

function clearSearch() {
  const hash = window.location.hash
  let targetEl = null

  // 1. Find the target element we are currently viewing (from the hash).
  //    VitePress slugifies heading IDs (underscores -> hyphens), so the hash
  //    #http_get doesn't match the heading ID "http-get". We use the data-name
  //    attribute on .api-function divs which preserves the original function name.
  if (hash) {
    const name = hash.slice(1)
    targetEl = document.querySelector(`.api-function[data-name="${name}"]`)
  }

  // 2. Clear the search text and unhide all elements
  searchQuery.value = ''
  filterApi()

  // 3. De-highlight the VitePress sidebar link by stripping is-active/has-active
  //    classes directly from the DOM. We CANNOT use history.replaceState to remove
  //    the hash because VitePress's SPA router intercepts state changes and forces
  //    a scroll-to-top asynchronously, which we cannot prevent.
  const activeItems = document.querySelectorAll('.VPSidebarItem.is-active, .VPSidebarItem.has-active')
  activeItems.forEach(el => {
    el.classList.remove('is-active', 'has-active')
  })

  // 4. After Vue flushes DOM updates, scroll to where the target element now sits.
  //    When hidden elements above are restored, the target shifts down in the DOM.
  //    We scroll to its new absolute position minus the sticky header offset.
  if (targetEl) {
    nextTick(() => {
      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY
      // 160px offset accounts for VitePress navbar + sticky ApiFilter bar, plus a bit of padding
      window.scrollTo({ top: targetTop - 160, behavior: 'instant' })
    })
  }
}
</script>

<template>
  <div class="api-filter-container">
    <div class="api-search-box">
      <span class="vpi-search api-search-icon"></span>
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Filter Rhai API functions..." 
        class="api-search-input"
      />
      <button v-if="searchQuery" class="api-search-clear" @click="clearSearch" aria-label="Clear search">
        <IconLucideX class="api-search-clear-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.api-filter-container {
  margin: 24px 0 32px;
  position: sticky;
  top: var(--vp-nav-height);
  z-index: 10;
  background-color: var(--vp-c-bg);
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.api-search-box {
  display: flex;
  align-items: center;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 8px 16px;
  transition: border-color 0.25s;
}

.api-search-box:focus-within {
  border-color: var(--vp-c-brand-1);
}

.api-search-icon {
  margin-right: 12px;
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-2);
}

.api-search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.api-search-input::placeholder {
  color: var(--vp-c-text-3);
}

.api-search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  transition: color 0.2s, background-color 0.2s;
}

.api-search-clear:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.api-search-clear-icon {
  width: 16px;
  height: 16px;
}
</style>
