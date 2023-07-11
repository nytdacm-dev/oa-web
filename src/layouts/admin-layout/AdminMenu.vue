<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
import { useRoute } from 'vue-router'
import type { Component } from 'vue'
import { NIcon, NMenu } from 'naive-ui'
import { computed, h } from 'vue'
import { Table as TableIcon, User as UserIcon } from '@vicons/fa'
import { GroupFilled as GroupIcon } from '@vicons/material'
import { renderMenuLabel } from '@/layouts/utils'

const props = defineProps<{
  collapsed: boolean
}>()

const route = useRoute()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuValue = computed(() => route.name as string)

const menuOptions: MenuOption[] = [
  {
    label: '用户管理',
    key: 'admin-user',
    path: '/admin/user',
    icon: renderIcon(UserIcon),
  },
  {
    label: '群组管理',
    key: 'admin-group',
    path: '/admin/group',
    icon: renderIcon(GroupIcon),
  },
  {
    label: '提交记录',
    key: 'admin-submission',
    path: '/admin/submission',
    icon: renderIcon(TableIcon),
  },
  {
    label: '文章列表',
    key: 'admin-article',
    path: '/admin/article',
    icon: renderIcon(TableIcon),
  },
]
</script>

<template>
  <NMenu :value="menuValue" :options="menuOptions" :render-label="renderMenuLabel" :collapsed="props.collapsed" :collapsed-width="64" />
</template>
