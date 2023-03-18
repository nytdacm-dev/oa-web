<script setup lang="ts">
import Auth from './components/Auth.vue'
import Link from '@/components/Link.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <div class="header">
    <div class="logo">
      <Link href="/">
        <img alt="nytdacm logo" class="img" src="@/assets/nytdacm-logo.png" width="40" height="40">
      </Link>
      <span>南邮通达程序设计校队</span>
    </div>
    <div class="menu">
      <NSpace>
        <Link href="/">
          <NButton quaternary>
            主页
          </NButton>
        </Link>
        <Link href="/member">
          <NButton quaternary>
            队员
          </NButton>
        </Link>
        <Link v-if="userStore.userId" href="/article">
          <NButton quaternary>
            文章
          </NButton>
        </Link>
      </NSpace>
    </div>
    <div class="auth">
      <Auth />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: var(--header-height);
  padding: 0 12px;

  > .logo {
    display: flex;
    justify-items: center;
    align-items: center;
    font-size: large;

    .img {
      margin-right: 5px;
    }
  }

  > .menu {
    margin-left: auto;
  }

  > .auth {
    margin-left: 20px;
  }
}
</style>
