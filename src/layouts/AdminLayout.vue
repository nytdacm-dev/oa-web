<script setup lang="ts">
import { NLayoutSider, NLayoutContent, NLayout } from 'naive-ui'
import AdminMenu from "@/layouts/admin-layout/AdminMenu.vue";
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider content-style="padding: 12px;">
      <AdminMenu />
    </NLayoutSider>
    <NLayoutContent content-style="padding: 12px;">
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>

<style lang="scss" scoped>

.wrapper {
  display: flex;

  > .menu {
    width: 200px;
    margin-right: 10px;
  }

  > .main {
    flex-grow: 1;
  }
}
</style>
