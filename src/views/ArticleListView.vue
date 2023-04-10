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
    <div class="article-list">
      <ArticleItem v-for="item in refData" :key="item.articleId" :article="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .article-list {
    width: 100%;
    max-width: 720px;
    background-color: white;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
