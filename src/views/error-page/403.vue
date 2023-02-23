<script setup lang="ts">
import { NResult } from 'naive-ui'
import { ref } from 'vue'
import ErrorPageFunc from '@/views/error-page/ErrorPageFunc.vue'
import lcy01 from '@/assets/403/lcy-01.jpg'
import lcy02 from '@/assets/403/lcy-02.jpg'
import yxc01 from '@/assets/403/yxc-01.jpg'

const pic = ref(Math.floor(Math.random() * 3) + 1)
</script>

<template>
  <div class="main">
    <NResult status="403" title="403 禁止访问" description="这不是你该碰的东西">
      <template #icon>
        <NImage v-if="pic === 1" preview-disabled :src="lcy01" />
        <NImage v-if="pic === 2" preview-disabled :src="lcy02" />
        <NImage v-if="pic === 3" preview-disabled :src="yxc01" />
      </template>
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
