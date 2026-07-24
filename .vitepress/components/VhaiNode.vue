<template>
  <div class="vhai-node">
    <Handle type="target" position="top" />
    <div class="header" :class="headerClass">{{ data?.title || label }}</div>
    <div class="body">
      <slot>
        <div v-if="data?.scriptBody" class="script-body">{{ data.scriptBody }}</div>
        <div v-if="data?.fn" class="fn-name">{{ data.fn }}</div>
      </slot>
    </div>
    <Handle type="source" position="bottom" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Handle } from '@vue-flow/core'
const props = defineProps<{
  label: string
  data?: any
}>()

const headerClass = computed(() => {
  if (!props.data?.kind) return 'kind-default'
  return `kind-${props.data.kind.toLowerCase()}`
})
</script>

<style scoped>
.vhai-node {
  background: #2a2a35;
  border: 1px solid #4a4a5a;
  border-radius: 8px;
  color: #fff;
  min-width: 150px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.5);
  font-family: monospace;
}
.header {
  padding: 5px 10px;
  font-weight: bold;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  text-align: center;
}
.body {
  padding: 10px;
}
.script-body {
  color: #9cdcfe;
  white-space: pre-wrap;
  font-size: 0.9em;
}
.fn-name {
  color: #dcdcaa;
  font-weight: bold;
}

.kind-default { background: #4a4a5a; }
.kind-event { background: #e51400; }
.kind-script { background: #00aba9; }
.kind-branch { background: #f0a30a; }
.kind-function { background: #60a917; }
.kind-return { background: #647687; }
</style>
