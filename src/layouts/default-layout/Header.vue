<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import Auth from './components/Auth.vue'
import Link from '@/components/Link.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()
</script>

<template>
  <div class="h-[var(--header-height)] flex items-center px-12px">
    <div class="flex items-center justify-center text-lg">
      <Link href="/">
        <img alt="nytdacm logo" class="mr-5px block" src="@/assets/nytdacm-logo.png" width="40" height="40">
      </Link>
      <span v-if="!isMobile">NYTD ACM</span>
    </div>
    <div class="ml-auto">
      <NSpace>
        <Link href="/">
          <NButton quaternary>
            主页
          </NButton>
        </Link>
        <Link href="/member">
          <NButton quaternary>
            队员
          </NButton>
        </Link>
        <Link href="/article">
          <NButton quaternary>
            文章
          </NButton>
        </Link>
      </NSpace>
    </div>
    <div class="ml-20px">
      <Auth />
    </div>
  </div>
</template>
