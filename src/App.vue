<script setup lang="ts">
import { RouterView } from "vue-router";
import { NNotificationProvider } from "naive-ui";
</script>

<template>
  <NNotificationProvider>
    <RouterView :key="$route.path + Math.random()" />
  </NNotificationProvider>
</template>

<style lang="scss" scoped></style>
