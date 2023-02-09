<script setup lang="ts">
import { NGrid, NGi } from "naive-ui";
import type { Models } from "@/models/models";
import SingleUserCard from "@/views/member-view/SingleUserCard.vue";

defineProps<{
  users: Models.User[];
}>();
</script>

<template>
  <NGrid cols="2 720:4 1440:6">
    <NGi :key="user.userId" v-for="user in users">
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
