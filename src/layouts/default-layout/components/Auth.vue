<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NAvatar, NDropdown, useNotification } from 'naive-ui'
import { useUserStore } from '@/stores/userStore'
import DefaultAvatar from '@/assets/user-default-avatar.png'
import Link from '@/components/Link.vue'

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
    label: '写文章',
    key: 'write-article',
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
  if (key === 'user-detail-page')
    router.push(`/user/${userStore.username}`)
  else if (key === 'write-article')
    router.push({ name: 'write-article' })
  else if (key === 'admin')
    router.push({ name: 'admin-user' })
  else if (key === 'logout')
    logout()
}
</script>

<template>
  <div class="wrapper">
    <Link v-if="!userStore.userId" href="/login">
      登录 | 注册
    </Link>
    <NDropdown v-else trigger="hover" :options="options" @select="handleSelect">
      <NAvatar round :size="40" :src="DefaultAvatar" />
    </NDropdown>
  </div>
</template>

<style lang="scss" scoped></style>
