<script setup lang="ts">
import { NLayout, NLayoutFooter, NLayoutHeader } from 'naive-ui'
import { RouterView } from 'vue-router'
import Header from '@/layouts/default-layout/Header.vue'
import Footer from '@/layouts/default-layout/Footer.vue'
</script>

<template>
  <NLayout class="flex flex-col">
    <NLayoutHeader bordered>
      <Header />
    </NLayoutHeader>
    <div
      class="min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex grow bg-[#f7f8fa]"
    >
      <RouterView />
    </div>
    <NLayoutFooter bordered>
      <Footer />
    </NLayoutFooter>
  </NLayout>
</template>
