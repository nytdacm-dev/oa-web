<script setup lang="ts">
import { NResult, NSpace, NButton } from 'naive-ui'
import { useRouter } from "vue-router";

const router = useRouter();
const play = () => {
  window.open('https://www.4399.com/', '_blank')
}
const study = () => {
  window.open('https://www.acwing.com/', '_blank')
}
const home = () => {
  router.push('/')
}
</script>

<template>
  <div class="main">
    <NResult status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <NSpace>
          <NButton @click="study">找点乐子吧</NButton>
          <NButton @click="play">干点正事吧</NButton>
          <NButton @click="home">回到首页吧</NButton>
        </NSpace>
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
