<script setup lang="tsx">
import { ref } from 'vue'

const props = defineProps<{
  href: string
}>()
const external = ref(props.href.startsWith('http'))
</script>

<template>
  <a v-if="external" :href="href" target="_blank" class="link">
    <slot />
  </a>
  <RouterLink v-else :to="href" class="link">
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
