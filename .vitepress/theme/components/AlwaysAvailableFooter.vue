<script setup lang="ts">
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const { theme, frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <footer v-if="hasSidebar && theme.footer && frontmatter.footer !== false" class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <p v-if="theme.footer.message" class="message" v-html="theme.footer.message"></p>
      <p v-if="theme.footer.copyright" class="copyright" v-html="theme.footer.copyright"></p>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.VPFooter.has-sidebar {
  /* Unlike the default theme, we don't hide the footer. 
     Instead, we shift it to the right when the sidebar is present on large screens. */
}

@media (min-width: 960px) {
  .VPFooter.has-sidebar {
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .VPFooter.has-sidebar {
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
  }
}


.VPFooter :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
