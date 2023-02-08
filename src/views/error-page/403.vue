<script setup lang="ts">
import { NResult } from 'naive-ui'
import ErrorPageFunc from "@/views/error-page/ErrorPageFunc.vue";
</script>

<template>
  <div class="main">
    <NResult status="403" title="403 禁止访问" description="这不是你该碰的东西">
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
