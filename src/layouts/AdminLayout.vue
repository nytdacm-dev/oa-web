<script setup lang="ts">
import { NLayoutSider, NLayoutContent, NLayout } from 'naive-ui'
import AdminMenu from "@/layouts/admin-layout/AdminMenu.vue";
import { ref } from "vue";

const collapsed = ref<boolean>(false)
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false">
      <AdminMenu :collapsed="collapsed" />
    </NLayoutSider>
    <NLayoutContent content-style="padding: 12px;">
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>

<style lang="scss" scoped>

</style>
