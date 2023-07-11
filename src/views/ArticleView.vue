<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { NAvatar, NH1, NSpace } from 'naive-ui'
import { timestampToDateString } from '@/shared/utils'
import type { Models } from '@/models/models'
import { http } from '@/shared/Http'
import DefaultAvatar from '@/assets/user-default-avatar.png'
import Link from '@/components/Link.vue'
import { useUserStore } from '@/stores/userStore'
import MDArticle from '@/components/MDArticle.vue'

const route = useRoute()
const articleId = route.params.articleId
const dataRef = ref<Models.Article>()
const contentRef = ref<string>('')
const authorHomepageRef = ref<string>('/user/')

const userStore = useUserStore()
onMounted(() => {
  http
    .get<Models.Article>(`/article/${articleId}`)
    .then((response) => {
      dataRef.value = response.data.data
      contentRef.value = dataRef.value.content
      authorHomepageRef.value = `/user/${dataRef?.value?.author.username}`
    })
})
</script>

<template>
  <div class="grow bg-white p-8">
    <NH1>
      {{ dataRef?.title }}
    </NH1>
    <div class="flex">
      <Link :href="authorHomepageRef">
        <NAvatar round :size="48" :src="DefaultAvatar" />
      </Link>
      <div class="pl-4">
        <div class="text-base">
          <Link :href="authorHomepageRef">
            {{ dataRef?.author.name }}
          </Link>
        </div>
        <div class="flex">
          <NSpace>
            <div>
              {{ timestampToDateString(dataRef?.createdAt ?? 0) }}
            </div>
            <div v-if="dataRef?.author.userId === userStore.userId">
              <Link :href="`/article/${articleId}/edit`">
                编辑
              </Link>
            </div>
          </NSpace>
        </div>
      </div>
    </div>
    <div>
      <MDArticle :data="contentRef" />
    </div>
  </div>
</template>
