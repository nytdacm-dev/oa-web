<script setup lang="ts">
import { NMenu } from 'naive-ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Auth from './components/Auth.vue'
import Link from '@/components/Link.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { renderMenuLabel } from '@/layouts/utils'

const { isMobile } = useBasicLayout()
const route = useRoute()

const menuOptions = computed(() => {
  return [
    {
      key: 'home',
      label: '主页',
      path: '/',
    },
    {
      key: 'member',
      label: '队员',
      path: '/member',
    },
    {
      key: 'article',
      label: '文章',
      path: '/article',
    },
  ]
})

const menuValue = computed(() => {
  if (route.name === 'member')
    return 'member'
  if ((route.name as string).startsWith('article'))
    return 'article'
  else if (route.name === 'home')
    return 'home'
  return null
})
</script>

<template>
  <div class="h-[calc(var(--header-height)-1px)] flex items-center px-12px">
    <div class="flex items-center justify-center text-lg">
      <Link href="/">
        <img alt="nytdacm logo" class="mr-5px block" src="@/assets/nytdacm-logo.png" width="40" height="40">
      </Link>
      <span v-if="!isMobile">NYTD ACM</span>
    </div>
    <div class="ml-auto">
      <NMenu
        mode="horizontal"
        :value="menuValue"
        :options="menuOptions"
        :render-label="renderMenuLabel"
      />
    </div>
    <div class="ml-20px">
      <Auth />
    </div>
  </div>
</template>
