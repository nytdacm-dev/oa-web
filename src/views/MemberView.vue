<script setup lang="ts">
import { http } from "@/shared/Http";
import type { Models } from "@/models/models";
import { onMounted, ref } from "vue";
import MemberGroup from "@/views/member-view/MemberGroup.vue";

const groups = ref<Models.Group[]>([]);
onMounted(() => {
  http
    .get<Models.Group[]>("/group/homepage")
    .then(res => {
      groups.value = res.data.data;
      groups.value.sort((a, b) => b.groupId - a.groupId);
      groups.value.forEach(group => group.users.sort((a, b) => a.name.localeCompare(b.name, "zh")));
    });
});
</script>

<template>
  <div class="main">
    <div v-for="group in groups">
      <MemberGroup :group="group" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
