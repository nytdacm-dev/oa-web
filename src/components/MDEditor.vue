<script setup lang="tsx">
import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/vue-next'

defineProps<{
  data: string
}>()
const emits = defineEmits<{
  (e: 'update:data', data: string): void
}>()

const plugins = [
  gfm(),
]

const handleChange = (v: string) => {
  emits('update:data', v)
}
</script>

<template>
  <Editor :value="data" :plugins="plugins" @change="handleChange" />
</template>

<style lang="scss" scoped>
</style>
