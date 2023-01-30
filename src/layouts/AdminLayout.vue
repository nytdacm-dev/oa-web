<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <div class="menu">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title>
            <span>用户</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;

  > .menu {
    width: 200px;
    margin-right: 10px;
  }
}
</style>
