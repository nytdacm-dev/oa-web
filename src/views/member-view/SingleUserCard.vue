<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import { useRouter } from 'vue-router'
import type { Models } from '@/models/models'
import DefaultAvatar from '@/assets/user-default-avatar.png'

const props = defineProps<{
  user: Models.User
}>()
const router = useRouter()
const goToUserProfile = () => {
  router.push(`/user/${props.user.username}`)
}
</script>

<template>
  <div class="m-10px flex flex-col cursor-pointer items-center justify-center b-rd-2 bg-white p-10px hover:shadow-lg" @click="goToUserProfile">
    <NAvatar class="m-5px" round :size="80" :src="DefaultAvatar" />
    <div>
      <span class="text-6">
        {{ props.user.name }}
      </span>
    </div>
  </div>
</template>
