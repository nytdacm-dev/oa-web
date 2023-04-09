<script setup lang="tsx">
import 'katex/dist/katex.css'
import { onUpdated, ref } from 'vue'
import { mdit } from '@/shared/markdown-it'

const props = defineProps<{
  data: string
}>()
const contentRef = ref()
onUpdated(() => {
  contentRef.value = mdit.render(props.data)
})
</script>

<template>
  <article class="article-content" v-html="contentRef" />
</template>

<style lang="scss">
.article-content {
  * {
    max-width: 100%;
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
