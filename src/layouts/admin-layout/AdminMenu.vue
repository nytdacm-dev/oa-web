<script lang="ts" setup>
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import type { Component } from "vue";
import { NIcon, NMenu } from "naive-ui";
import { h } from "vue";
import {
  HouseUser as HouseUserIcon,
  User as UserIcon,
} from '@vicons/fa'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '用户',
    key: 'user',
    icon: renderIcon(HouseUserIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'admin-user',
              }
            },
            { default: () => '用户管理' }
          ),
        key: 'go-back-home',
        icon: renderIcon(UserIcon)
      }
    ],
  },
]
</script>

<template>
  <NMenu :options="menuOptions" />
</template>

<style lang="scss" scoped>

</style>
