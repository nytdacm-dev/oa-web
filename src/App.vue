<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRecaptchaProvider } from 'vue-recaptcha'
import NaiveProvider from '@/components/NaiveProvider.vue'

useRecaptchaProvider()
</script>

<template>
  <NaiveProvider>
    <RouterView :key="$route.path + Math.random()" />
  </NaiveProvider>
</template>
