<script setup lang="ts">
import { NLayout, NLayoutSider } from 'naive-ui'
import { ref, watch } from 'vue'
import AdminMenu from '@/layouts/admin-layout/AdminMenu.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()
const collapsed = ref<boolean>(false)
watch(isMobile, (value) => {
  collapsed.value = value
})
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
    <div class="flex grow">
      <RouterView />
    </div>
  </NLayout>
</template>
