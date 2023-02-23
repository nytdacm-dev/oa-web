<script setup lang="ts">
import { NGi, NGrid } from 'naive-ui'
import type { Models } from '@/models/models'
import SingleUserCard from '@/views/member-view/SingleUserCard.vue'

defineProps<{
  users: Models.User[]
}>()
</script>

<template>
  <NGrid cols="2 720:4 1440:6">
    <NGi v-for="user in users" :key="user.userId">
      <SingleUserCard :user="user" />
    </NGi>
  </NGrid>
</template>

<style lang="scss" scoped>
.wrapper {
  .title {
    font-size: 24px;
  }
}
</style>
