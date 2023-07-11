<script setup lang="ts">
import { NLayout, NLayoutFooter, NLayoutHeader } from 'naive-ui'
import { RouterView } from 'vue-router'
import Header from '@/layouts/default-layout/Header.vue'
import Footer from '@/layouts/default-layout/Footer.vue'
</script>

<template>
  <NLayout class="flex flex-col">
    <NLayoutHeader>
      <Header />
    </NLayoutHeader>
    <div class="min-h-[calc(100vh-var(--header-height)-var(--footer-height)-16px)] flex grow bg-[#f4f5f5] p-8px">
      <RouterView />
    </div>
    <NLayoutFooter>
      <Footer />
    </NLayoutFooter>
  </NLayout>
</template>
