<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput, NSpace, useNotification } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import type { AxiosError } from 'axios'
import MDEditor from '@/components/MDEditor.vue'
import type { HttpResponse } from '@/shared/Http'
import { http } from '@/shared/Http'
import type { Models } from '@/models/models'

const notification = useNotification()
const router = useRouter()
const route = useRoute()
const modeRef = ref<'新建' | '编辑'>('新建')
const articleIdRef = ref()
if (route.name === 'article-edit') {
  modeRef.value = '编辑'
  articleIdRef.value = route.params.articleId
  http
    .get<Models.Article>(`/article/${articleIdRef.value}`)
    .then((response) => {
      titleRef.value = response.data.data.title
      contentRef.value = response.data.data.content
    })
}
const titleRef = ref<string>('')
const contentRef = ref<string>('')
const publishAction = () => {
  if (titleRef.value === '' || contentRef.value === '') {
    notification.error({
      title: '发布失败',
      content: '标题和内容不能为空',
      duration: 2000,
    })
    return
  }
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
const updateAction = () => {
  if (titleRef.value === '' || contentRef.value === '') {
    notification.error({
      title: '发布失败',
      content: '标题和内容不能为空',
      duration: 2000,
    })
    return
  }
  http.patch<Models.Article>(`/article/${articleIdRef.value}`, {
    title: titleRef.value,
    content: contentRef.value,
  })
    .then((_res) => {
      notification.success({
        title: '修改成功',
        duration: 2000,
      })
      router.push({ name: 'article-list' })
    })
    .catch((err: AxiosError<HttpResponse>) => {
      notification.error({
        title: '修改失败',
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
      <NButton v-if="modeRef === '新建'" @click="publishAction">
        发表
      </NButton>
      <NButton v-else @click="updateAction">
        编辑
      </NButton>
    </NSpace>
  </div>
</template>

<style lang="scss">
.bytemd {
  height: calc(100vh - 300px);

  &-preview {
    * {
      max-width: 100%;
    }
  }
}
</style>
