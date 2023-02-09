<script setup lang="tsx">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();
const props = defineProps<{
  href: string;
  newWindow?: boolean;
}>();
const href = ref(props.href);
onMounted(() => {
  if (!props.href.startsWith("http://") && !props.href.startsWith("https://")) {
    href.value = router.resolve(props.href).href;
  }
});
</script>

<template>
  <a :href="href" :target="newWindow ? '_blank' : '_self'" rel="noopener noreferrer" class="link">
    <slot />
  </a>
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
