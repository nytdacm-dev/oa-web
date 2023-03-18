<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { http } from '@/shared/Http'
import type { ListWrapper, Models } from '@/models/models'
import ArticleItem from '@/views/article-lise-view/ArticleItem.vue'

const refData = ref<Models.Article[]>()

onMounted(() => {
  http
    .get<ListWrapper<Models.Article>>('/article')
    .then((response) => {
      refData.value = response.data.data.data
    })
})
</script>

<template>
  <div class="main">
    这是页面文章列表
    <ul>
      <ArticleItem v-for="item in refData" :key="item.articleId" :article="item" />
    </ul>
  </div>
</template>
