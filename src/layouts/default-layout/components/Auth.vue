<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import DefaultAvatar from '@/assets/user-default-avatar.png'
import { NDropdown, NAvatar, useNotification } from "naive-ui"
import Link from "@/components/Link.vue";

const userStore = useUserStore()
const router = useRouter()
const notification = useNotification()
const logout = () => {
  notification.success({
    title: '退出登录成功',
    duration: 2000,
  })
  userStore.logout()
  router.push({ name: 'login' })
}
const options = [
  {
    label: '个人中心',
    key: 'user-detail-page',
  },
  {
    type: 'divider',
  },
  {
    label: '管理后台',
    key: 'admin',
  },
  {
    type: 'divider',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]
const handleSelect = (key: string | number) => {
  if (key === 'user-detail-page') {
    router.push(`/user/${ userStore.username }`)
  } else if (key === 'admin') {
    router.push({ name: 'admin-user' })
  } else if (key === 'logout') {
    logout()
  }
}
</script>
<template>
  <div class="wrapper">
    <Link href="/login" v-if="!userStore.userId">登录 | 注册</Link>
    <NDropdown trigger="hover" :options="options" @select="handleSelect" v-else>
      <NAvatar round :size="40" :src="DefaultAvatar" />
    </NDropdown>
  </div>
</template>
<style lang="scss" scoped>

</style>
