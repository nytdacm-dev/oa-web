<script setup lang="ts">
import { NDivider } from 'naive-ui'
import type { Models } from '@/models/models'
import UserList from '@/views/member-view/UserList.vue'

const props = defineProps<{
  group: Models.Group
}>()
</script>

<template>
  <div>
    <NDivider>
      <span class="text-8">{{ group.displayName ? group.displayName : group.name }}</span>
    </NDivider>
    <UserList :users="props.group.users" />
  </div>
</template>
