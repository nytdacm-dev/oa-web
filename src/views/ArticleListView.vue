<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { http } from '@/shared/Http'
import type { ListWrapper, Models } from '@/models/models'

interface Article {
  articleId: number
  title: string
  content: string
  author: Models.User
}

const refData = ref<Article[]>()

onMounted(() => {
  http.get<ListWrapper<Article>>('/article')
    .then((response) => {
      refData.value = response.data.data.data
    })
})
</script>

<template>
  <div class="main">
    这是页面文章列表
    <ul>
      <li v-for="item in refData" :key="item.articleId">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
