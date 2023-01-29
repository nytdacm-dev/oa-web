<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView :key="$route.path + Math.random()" />
</template>

<style lang="scss" scoped>

</style>
