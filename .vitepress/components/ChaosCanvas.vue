<template>
  <div class="chaos-canvas-wrapper" style="height: 600px; width: 100%; border: 1px solid #0D32B2; border-radius: 8px; overflow: hidden; margin: 20px 0; background: #1a1a1a;">
    <ClientOnly>
      <VueFlow
        v-model:nodes="flowNodes"
        v-model:edges="flowEdges"
        :fit-view-on-init="true"
        class="dark"
        :nodes-draggable="mode === 'vhai'"
        :nodes-connectable="mode === 'vhai'"
      >
        <Background pattern-color="#333" />
        <Controls />
        <template #node-arch="props">
          <ArchNode :label="props.data.label" />
        </template>
        <template #node-vhai="props">
          <VhaiNode :label="props.data.label" :data="props.data" />
        </template>
      </VueFlow>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import ArchNode from './ArchNode.vue'
import VhaiNode from './VhaiNode.vue'
import dagre from 'dagre'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

const props = defineProps<{
  mode?: 'architecture' | 'vhai'
  data: {
    nodes: any[]
    edges: any[]
  }
}>()

const flowNodes = ref<any[]>([])
const flowEdges = ref<any[]>([])

const layoutNodes = () => {
  if (props.mode === 'vhai') {
    return props.data.nodes.map(n => ({
      ...n,
      type: 'vhai',
      data: { label: n.label, ...n.data }
    }))
  }

  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: 'TB', nodesep: 50, ranksep: 100 })
  g.setDefaultEdgeLabel(() => ({}))

  props.data.nodes.forEach(node => {
    g.setNode(node.id.toString(), { width: 300, height: 80 })
  })

  props.data.edges.forEach(edge => {
    g.setEdge(edge.source.toString(), edge.target.toString())
  })

  dagre.layout(g)

  return props.data.nodes.map(node => {
    const nodeWithPosition = g.node(node.id.toString())
    return {
      ...node,
      id: node.id.toString(),
      type: 'arch',
      position: node.position || {
        x: nodeWithPosition.x - 150,
        y: nodeWithPosition.y - 40
      },
      data: { label: node.label, ...node.data }
    }
  })
}

onMounted(() => {
  if (!props.data) return
  
  flowNodes.value = layoutNodes()
  flowEdges.value = (props.data.edges || []).map((e, idx) => ({
    ...e,
    id: e.id ? e.id.toString() : `e-${e.source}-${e.target}-${idx}`,
    source: e.source.toString(),
    target: e.target.toString(),
    animated: props.mode === 'vhai' ? true : false,
    style: { stroke: '#F2A041', strokeWidth: 2, ...e.style }
  }))
})
</script>

<style>
/* Custom global dark theme overrides if needed */
.vue-flow__edge-path {
  stroke: #888;
  stroke-width: 2px;
}
</style>
