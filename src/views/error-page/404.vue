<script setup lang="ts">
import { NResult } from 'naive-ui'
import ErrorPageFunc from '@/views/error-page/ErrorPageFunc.vue'
</script>

<template>
  <div class="main">
    <NResult status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <ErrorPageFunc />
      </template>
    </NResult>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
