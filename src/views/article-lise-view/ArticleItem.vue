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
  <div class="p-4 pb-0 hover:bg-[#fafafa]">
    <a :href="`${router.resolve(`/article/${article.articleId}`).href}`" class="text-black decoration-none visited:text-[#808080]">
      <div>
        <span>
          <Link :href="`/user/${article.author.username}`">
            {{ article.author.name }}
          </Link>
        </span>
        <span> | </span>
        <span class="text-[#8b919e]">{{ timestampToDateString(article.createdAt) }}</span>
      </div>
      <div class="border-b border-b-[#f7f8fa] border-b-solid">
        <div class="my-2 text-xl font-medium">
          {{ article.title }}
        </div>
      </div>
    </a>
  </div>
</template>
