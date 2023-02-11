<script setup lang="ts">
import { NSpace, NButton } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();
const play = () => {
  window.open("https://www.4399.com/", "_blank");
};
const study = () => {
  window.open("https://www.acwing.com/", "_blank");
};
const aha = () => {
  window.open("https://www.bilibili.com/video/BV1GJ411x7h7", "_blank");
};
const home = () => {
  router.push("/");
};
</script>

<template>
  <NSpace vertical class="func">
    <NSpace>
      <NButton @click="study">找点乐子吧</NButton>
      <NButton @click="play">干点正事吧</NButton>
      <NButton @click="home">回到首页吧</NButton>
    </NSpace>
    <NSpace>
      <NButton @click="aha">AK World Final 秘籍</NButton>
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
