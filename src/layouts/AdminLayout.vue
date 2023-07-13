<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutSider, NScrollbar } from 'naive-ui'
import { ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import AdminMenu from '@/layouts/admin-layout/AdminMenu.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import Header from '@/layouts/default-layout/Header.vue'

const { isMobile } = useBasicLayout()
const collapsed = ref<boolean>(false)
watch(isMobile, (value) => {
  collapsed.value = value
})
</script>

<template>
  <NLayout class="flex flex-col">
    <NLayoutHeader bordered>
      <Header />
    </NLayoutHeader>
    <NLayout has-sider class="h-[calc(100vh-var(--header-height))]">
      <NLayoutSider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="160"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <NScrollbar>
          <AdminMenu :collapsed="collapsed" class="min-h-[calc(100vh-200px)]" />
        </NScrollbar>
      </NLayoutSider>
      <div class="flex grow bg-[#f7f8fa]">
        <NScrollbar>
          <RouterView />
        </NScrollbar>
      </div>
    </NLayout>
  </NLayout>
</template>
