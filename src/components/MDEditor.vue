<script setup lang="tsx">
import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/vue-next'
import math from '@bytemd/plugin-math'
import { http } from '@/shared/Http'
import 'katex/dist/katex.css'

defineProps<{
  data: string
}>()
const emits = defineEmits<{
  (e: 'update:data', data: string): void
}>()

const plugins = [
  gfm(),
  math(),
]

const handleChange = (v: string) => {
  emits('update:data', v)
}
const upload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await http.post<{
    filename: string
    url: string
  }>('/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  if (res.data.code === 200)
    return res.data.data
  else
    return null
}
const uploadImages = async (files: File[]) => {
  const result: {
    alt?: string
    title?: string
    url: string
  }[] = []
  for (const file of files) {
    const res = await upload(file)
    if (!res)
      continue
    const url = res?.url
    const img = {
      url,
    }
    result.push(img)
  }
  return result
}
</script>

<template>
  <Editor :value="data" :plugins="plugins" :upload-images="uploadImages" @change="handleChange" />
</template>

<style lang="scss" scoped>
</style>
