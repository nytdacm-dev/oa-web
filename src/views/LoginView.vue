<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui'
import LoginForm from './login-view/LoginForm.vue'
import SignupForm from '@/views/login-view/SignupForm.vue'
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <div class="b-rd-4 bg-white p-10 shadow-lg">
      <NTabs type="line" animated>
        <NTabPane name="登录" tab="登录">
          <LoginForm />
        </NTabPane>
        <NTabPane name="注册" tab="注册">
          <SignupForm />
        </NTabPane>
      </NTabs>
    </div>
  </div>
</template>
