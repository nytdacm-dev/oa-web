<script setup lang="ts">
import { RouterView } from 'vue-router'
import NaiveProvider from '@/components/NaiveProvider.vue'
</script>

<template>
  <NaiveProvider>
    <RouterView :key="$route.path + Math.random()" />
  </NaiveProvider>
</template>
