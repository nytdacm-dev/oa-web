<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import { ref } from 'vue'
import AdminMenu from '@/layouts/admin-layout/AdminMenu.vue'

const collapsed = ref<boolean>(false)
</script>

<template>
  <NLayout has-sider class="wrapper">
    <NLayoutSider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <AdminMenu :collapsed="collapsed" class="menu" />
    </NLayoutSider>
    <NLayoutContent content-style="padding: 12px;">
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>

<style lang="scss" scoped>
.menu {
  min-height: 100vh;
}
</style>
