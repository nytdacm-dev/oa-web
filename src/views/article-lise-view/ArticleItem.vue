<script setup lang="ts">
import type { Models } from '@/models/models'
import Link from '@/components/Link.vue'

defineProps<{
  article: Models.Article
}>()
</script>

<template>
  <li>
    <Link :href="`/article/${article.articleId}`">
      {{ article.title }} - {{ article.author.name }}
    </Link>
  </li>
</template>

<style lang="scss" scoped></style>
