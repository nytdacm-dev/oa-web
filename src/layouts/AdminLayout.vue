<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import { ref } from 'vue'
import AdminMenu from '@/layouts/admin-layout/AdminMenu.vue'

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
      @expand="collapsed = false"
    >
      <AdminMenu :collapsed="collapsed" class="min-h-[calc(100vh-200px)]" />
    </NLayoutSider>
    <NLayoutContent content-style="padding: 12px;">
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>
