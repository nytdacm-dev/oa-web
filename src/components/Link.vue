<script setup lang="tsx">
defineProps<{
  href: string
}>()
</script>

<template>
  <RouterLink :to="href" class="link">
    <slot />
  </RouterLink>
</template>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  color: black;
  text-decoration: none;

  &:hover {
    color: #1890ff;
  }
}
</style>
