<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import type { Models } from '@/models/models'
import { http } from '@/shared/Http'

const route = useRoute()
const articleId = route.params.articleId
const dataRef = ref<Models.Article>()
const contentRef = ref<string>('')

onMounted(() => {
  const md = MarkdownIt()
  http
    .get<Models.Article>(`/article/${articleId}`)
    .then((response) => {
      dataRef.value = response.data.data
      contentRef.value = md.render(dataRef.value.content ?? '')
    })
})
</script>

<template>
  <div>
    <NH1>{{ dataRef?.title }}</NH1>
    <div class="article-content" v-html="contentRef" />
  </div>
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
