<script setup lang="ts">
import { NResult } from 'naive-ui'
import ErrorPageFunc from '@/views/error-page/ErrorPageFunc.vue'
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <NResult status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <ErrorPageFunc />
      </template>
    </NResult>
  </div>
</template>
