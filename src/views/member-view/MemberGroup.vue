<script setup lang="ts">
import { NDivider } from 'naive-ui'
import type { Models } from '@/models/models'
import UserList from '@/views/member-view/UserList.vue'

const props = defineProps<{
  group: Models.Group
}>()
</script>

<template>
  <div class="wrapper">
    <NDivider>
      <span class="title">{{ group.displayName ? group.displayName : group.name }}</span>
    </NDivider>
    <UserList :users="props.group.users" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  .title {
    font-size: 2rem;
  }
}
</style>
