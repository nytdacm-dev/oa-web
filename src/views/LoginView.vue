<script setup lang="ts">
import LoginForm from "./login-view/LoginForm.vue";
import SignupForm from "./login-view/SignupForm.vue";
import { NCard, NTabs, NTabPane } from "naive-ui";
</script>

<template>
  <div class="main">
    <NCard class="box-card">
      <NTabs type="line" animated>
        <NTabPane name="登录" tab="登录">
          <LoginForm />
        </NTabPane>
        <NTabPane name="注册" tab="注册">
          <SignupForm />
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: calc(100vh - 2 * var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;

  > .box-card {
    width: 100%;
    max-width: 800px;
  }
}
</style>
