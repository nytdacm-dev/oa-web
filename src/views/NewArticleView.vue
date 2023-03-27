<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput, NSpace, useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'
import type { AxiosError } from 'axios'
import MDEditor from '@/components/MDEditor.vue'
import type { HttpResponse } from '@/shared/Http'
import { http } from '@/shared/Http'
import type { Models } from '@/models/models'

const notification = useNotification()
const router = useRouter()
const titleRef = ref<string>('')
const contentRef = ref<string>('')
const publishAction = () => {
  http.post<Models.Article>('/article', {
    title: titleRef.value,
    content: contentRef.value,
  })
    .then((_res) => {
      notification.success({
        title: '发布成功',
        content: '请等待管理员审核后发布到首页',
        duration: 2000,
      })
      router.push({ name: 'article-list' })
    })
    .catch((err: AxiosError<HttpResponse>) => {
      notification.error({
        title: '发布失败',
        content: err.response?.data.message,
        duration: 2000,
      })
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
