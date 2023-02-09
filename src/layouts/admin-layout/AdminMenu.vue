<script lang="ts" setup>
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import type { Component } from "vue";
import { NIcon, NMenu } from "naive-ui";
import { h } from "vue";
import { User as UserIcon, Table as TableIcon } from "@vicons/fa";
import { GroupFilled as GroupIcon } from "@vicons/material";

const props = defineProps<{
  collapsed: boolean;
}>();

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "admin-user",
          },
        },
        { default: () => "用户管理" }
      ),
    key: "admin-user",
    icon: renderIcon(UserIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "admin-group",
          },
        },
        { default: () => "群组管理" }
      ),
    key: "admin-group",
    icon: renderIcon(GroupIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "admin-submission",
          },
        },
        { default: () => "提交记录" }
      ),
    key: "admin-submission",
    icon: renderIcon(TableIcon),
  },
];
</script>

<template>
  <NMenu :options="menuOptions" :collapsed="props.collapsed" :collapsed-width="64" />
</template>

<style lang="scss" scoped></style>
