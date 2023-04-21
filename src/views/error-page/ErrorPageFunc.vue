<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const play = () => {
  window.open('https://bytelegend.com/', '_blank')
}
const study = () => {
  window.open('https://www.nowcoder.com/courses/cover/live/724?coupon=A6t6JmF', '_blank')
}
const aha = () => {
  window.open('https://www.bilibili.com/video/BV1E34y1E7cw', '_blank')
}
const home = () => {
  router.push('/')
}
</script>

<template>
  <NSpace vertical class="func">
    <NSpace>
      <NButton @click="study">
        找点乐子吧
      </NButton>
      <NButton @click="play">
        干点正事吧
      </NButton>
      <NButton @click="home">
        回到首页吧
      </NButton>
    </NSpace>
    <NSpace>
      <NButton @click="aha">
        AK World Final 秘籍
      </NButton>
    </NSpace>
  </NSpace>
</template>

<style lang="scss" scoped>
.func {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
