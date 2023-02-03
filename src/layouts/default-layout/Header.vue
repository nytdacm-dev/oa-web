<script setup lang="ts">
import Auth from './components/Auth.vue';
</script>

<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">
        <img alt="nytdacm logo" class="img" src="@/assets/nytdacm-logo.png" width="40" height="40" />
      </router-link>
      <span>南邮通达程序设计校队</span>
    </div>
    <div class="menu">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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

  >.menu {
    margin-left: auto;
  }

  >.auth {
    margin-left: 20px;
  }
}
</style>
