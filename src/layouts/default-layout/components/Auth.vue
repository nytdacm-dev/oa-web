<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import DefaultAvatar from '@/assets/user-default-avatar.png'
import { ElNotification } from 'element-plus';

const userStore = useUserStore()
const router = useRouter()
const pushToLoginPage = () => {
  router.push('/login')
}
const underConstruction = (message: string) => {
  ElNotification({
    title: message,
    message: '施工中 :)',
    position: 'bottom-right',
  })
}
const logout = () => {
  ElNotification({
    title: '退出登录成功',
    type: 'success',
  })
  userStore.logout()
}
</script>
<template>
  <el-link :underline="false" @click="pushToLoginPage" v-if="!userStore.userId">登录 | 注册</el-link>
  <el-dropdown v-else>
    <el-avatar :src="DefaultAvatar" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="() => underConstruction('个人中心')">个人中心</el-dropdown-item>
        <el-dropdown-item divided v-if="userStore.superAdmin || userStore.admin"
          @click="() => underConstruction('管理后台')">管理后台</el-dropdown-item>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
