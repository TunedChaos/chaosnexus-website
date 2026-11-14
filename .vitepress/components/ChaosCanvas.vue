<!-- chaosnexus-website/.vitepress/components/ChaosCanvas.vue -->
<template>
  <div
    class="chaos-canvas-wrapper"
    :class="{
      'is-compact': isCompact,
      'is-interactive': interactionEnabled,
    }"
  >
    <!--
      On narrow viewports the diagram starts locked so one-finger page scroll works.
      Users opt in to pan/zoom; Done returns to scroll-friendly mode.
    -->
    <button
      v-if="isCompact && !interactionEnabled"
      type="button"
      class="chaos-canvas-unlock"
      @click="interactionEnabled = true"
    >
      Tap to explore diagram
    </button>
    <button
      v-else-if="isCompact && interactionEnabled"
      type="button"
      class="chaos-canvas-lock"
      @click="interactionEnabled = false"
    >
      Done
    </button>

    <ClientOnly>
      <VueFlow
        v-model:nodes="flowNodes"
        v-model:edges="flowEdges"
        :fit-view-on-init="true"
        class="dark"
        :min-zoom="0.15"
        :max-zoom="2"
        :nodes-draggable="mode === 'vhai' && interactionEnabled"
        :nodes-connectable="mode === 'vhai' && interactionEnabled"
        :pan-on-drag="interactionEnabled"
        :zoom-on-scroll="false"
        :zoom-on-pinch="interactionEnabled"
        :zoom-on-double-click="interactionEnabled"
        :prevent-scrolling="interactionEnabled"
        :elements-selectable="interactionEnabled"
      >
        <Background pattern-color="#333" />
        <Controls v-if="interactionEnabled || !isCompact" />
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
import { ref, onMounted, onUnmounted } from 'vue'
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
/** True when viewport is phone/tablet width; drives compact height + scroll lock. */
const isCompact = ref(false)
/** Desktop: always interactive. Mobile: false until "Tap to explore". */
const interactionEnabled = ref(true)

let mediaQuery: MediaQueryList | null = null

const applyViewportMode = () => {
  if (!mediaQuery) return
  isCompact.value = mediaQuery.matches
  // Relock when crossing into compact so scroll is never stuck capturing.
  interactionEnabled.value = !mediaQuery.matches
}

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
  mediaQuery = window.matchMedia('(max-width: 960px)')
  applyViewportMode()
  mediaQuery.addEventListener('change', applyViewportMode)

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

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', applyViewportMode)
})
</script>

<style>
.chaos-canvas-wrapper {
  position: relative;
  height: 600px;
  width: 100%;
  border: 1px solid #0D32B2;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
  background: #1a1a1a;
}

.chaos-canvas-wrapper.is-compact {
  height: 280px;
  margin: 12px 0;
  /* Prefer vertical page scroll until the user unlocks the diagram. */
  touch-action: pan-y;
}

.chaos-canvas-wrapper.is-compact.is-interactive {
  touch-action: none;
}

@media (max-width: 480px) {
  .chaos-canvas-wrapper.is-compact {
    height: 220px;
  }
}

.chaos-canvas-unlock,
.chaos-canvas-lock {
  position: absolute;
  z-index: 6;
  border: 1px solid #0D7CE9;
  border-radius: 999px;
  background: rgba(8, 55, 78, 0.92);
  color: #E1F4FC;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.chaos-canvas-unlock {
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: rgba(8, 55, 78, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chaos-canvas-lock {
  top: 10px;
  right: 10px;
  padding: 6px 12px;
}

.vue-flow__edge-path {
  stroke: #888;
  stroke-width: 2px;
}
</style>
