<script setup lang="ts">
</script>

<template>
  <div class="header">
    <router-link to="/">
      <img alt="nytdacm logo" class="logo" src="@/assets/nytdacm-logo.svg" width="125" height="60" />
    </router-link>
    <div class="menu">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--header-height);
  justify-content: space-between;
}
</style>
