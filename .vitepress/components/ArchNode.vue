<template>
  <div class="arch-node">
    <Handle type="target" position="top" />
    <div class="label" v-html="label"></div>
    <Handle type="source" position="bottom" />
  </div>
</template>

<script setup lang="ts">
import { Handle } from '@vue-flow/core'
defineProps<{
  label: string
}>()
</script>

<style scoped>
.arch-node {
  background: #111;
  border: 2px solid #0D7CE9;
  border-radius: 4px;
  padding: 10px 20px;
  color: #fff;
  font-family: monospace;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  white-space: pre-line;
}
</style>
