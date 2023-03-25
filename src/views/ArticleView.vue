<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { NAvatar, NH1 } from 'naive-ui'
import { timestampToDateString } from '@/shared/utils'
import type { Models } from '@/models/models'
import { http } from '@/shared/Http'
import DefaultAvatar from '@/assets/user-default-avatar.png'
import Link from '@/components/Link.vue'

const route = useRoute()
const articleId = route.params.articleId
const dataRef = ref<Models.Article>()
const contentRef = ref<string>('')
const authorHomepageRef = ref<string>('/user/')

onMounted(() => {
  const md = MarkdownIt()
  http
    .get<Models.Article>(`/article/${articleId}`)
    .then((response) => {
      dataRef.value = response.data.data
      contentRef.value = md.render(dataRef.value.content ?? '')
      authorHomepageRef.value = `/user/${dataRef?.value?.author.username}`
    })
})
</script>

<template>
  <div class="wrapper">
    <article>
      <NH1>{{ dataRef?.title }}</NH1>
      <div class="author-info">
        <Link :href="authorHomepageRef">
          <NAvatar round :size="48" :src="DefaultAvatar" />
        </Link>
        <div class="author">
          <div class="name">
            <Link :href="authorHomepageRef">
              {{ dataRef?.author.name }}
            </Link>
          </div>
          <div class="meta">
            <div class="time">
              <span>发表于：{{ timestampToDateString(dataRef?.createdAt ?? 0) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="article-content" v-html="contentRef" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: white;

  article {
    padding: 2rem;

    .author-info {
      display: flex;

      > .author {
        padding-left: 1rem;

        .name {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>

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
