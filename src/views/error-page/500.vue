<script setup lang="ts">
import { NResult } from 'naive-ui'
import ErrorPageFunc from '@/views/error-page/ErrorPageFunc.vue'
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <NResult status="500" title="500 服务器错误" description="赶紧去 call 你们的涛宁哥哥">
      <template #footer>
        <ErrorPageFunc />
      </template>
    </NResult>
  </div>
</template>
