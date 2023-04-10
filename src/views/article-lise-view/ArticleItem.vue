<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Models } from '@/models/models'
import Link from '@/components/Link.vue'
import { timestampToDateString } from '@/shared/utils'

defineProps<{
  article: Models.Article
}>()
const router = useRouter()
</script>

<template>
  <div class="item">
    <a :href="`${router.resolve(`/article/${article.articleId}`).href}`" class="item-link">
      <div class="meta">
        <span class="author">
          <Link :href="`/user/${article.author.username}`">
            {{ article.author.name }}
          </Link>
        </span>
        <span> | </span>
        <span style="color: #8b919e;">{{ timestampToDateString(article.createdAt) }}</span>
      </div>
      <div class="main">
        <div class="title">
          {{ article.title }}
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.item {
  padding: 1rem 1rem 0;

  > .item-link {
    color: black;
    text-decoration: none;

    &:visited {
      color: #808080;
    }

    > .main {
      border-bottom: 1px solid #f4f5f5;
      min-height: calc(100%);

      > .title {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0.5rem 0;
      }
    }
  }

  &:hover {
    background-color: #fafafa;
  }
}
</style>
