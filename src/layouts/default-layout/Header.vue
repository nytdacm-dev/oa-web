<script setup lang="ts">
import Auth from './components/Auth.vue';
</script>

<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">
        <img alt="nytdacm logo" class="logo" src="@/assets/nytdacm-logo.svg" width="125" height="60" />
      </router-link>
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

  >.menu {
    margin-left: auto;
  }

  >.auth {
    margin-left: 20px;
  }
}
</style>
