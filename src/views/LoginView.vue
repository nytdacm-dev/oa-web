<script setup lang="ts">
import { NCard, NTabPane, NTabs } from 'naive-ui'
import LoginForm from './login-view/LoginForm.vue'
</script>

<template>
  <div class="main">
    <NCard class="box-card">
      <NTabs type="line" animated>
        <NTabPane name="登录" tab="登录">
          <LoginForm />
        </NTabPane>
        <NTabPane name="注册" tab="注册">
          暂停注册
          <!-- <SignupForm /> -->
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 2 * var(--header-height) - 150px);
  display: flex;
  align-items: center;
  justify-content: center;

  > .box-card {
    width: 100%;
    max-width: 800px;
  }
}
</style>
