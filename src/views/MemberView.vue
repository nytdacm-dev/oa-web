<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { http } from '@/shared/Http'
import type { Models } from '@/models/models'
import MemberGroup from '@/views/member-view/MemberGroup.vue'

const groups = ref<Models.Group[]>([])
onMounted(() => {
  http.get<Models.Group[]>('/group/homepage').then((res) => {
    groups.value = res.data.data
    groups.value.sort((a, b) => (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0))
    groups.value.forEach(group => group.users.sort((a, b) => a.name.localeCompare(b.name, 'zh')))
  })
})
</script>

<template>
  <div class="w-full">
    <div v-for="group in groups" :key="group.groupId">
      <MemberGroup :group="group" />
    </div>
  </div>
</template>
