<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput, NSpace } from 'naive-ui'
import { useRouter } from 'vue-router'
import MDEditor from '@/components/MDEditor.vue'
import { http } from '@/shared/Http'
import type { Models } from '@/models/models'

const router = useRouter()
const titleRef = ref<string>('')
const contentRef = ref<string>('')
const publishAction = () => {
  http.post<Models.Article>('/article', {
    title: titleRef.value,
    content: contentRef.value,
  }).then((_res) => {
    router.push({ name: 'article-list' })
  })
}
</script>

<template>
  <div class="main">
    <NSpace vertical>
      <NInput v-model:value="titleRef" type="text" />
      <MDEditor v-model:data="contentRef" />
      <NButton @click="publishAction">
        发表
      </NButton>
    </NSpace>
  </div>
</template>
