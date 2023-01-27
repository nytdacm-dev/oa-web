<script setup lang="ts">
import LoginForm from './login-view/LoginForm.vue';
import SignupForm from './login-view/SignupForm.vue';
import { ref } from 'vue'

const type = ref<'登录' | '注册'>('登录')
</script>

<template>
  <div class="main">
    <el-card class="box-card">
      <el-tabs v-model="type" class="demo-tabs">
        <p style="text-align: center;"><del>确实有点丑，但又不是不能用</del></p>
        <el-tab-pane label="登录" name="登录">
          <LoginForm v-if="type === '登录'" />
        </el-tab-pane>
        <el-tab-pane label="注册" name="注册">
          <SignupForm v-if="type === '注册'" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: calc(100vh - 2*var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;

  >.box-card {
    width: 100%;
    max-width: 800px;
    height: 100%;
    max-height: 400px;
  }
}
</style>
