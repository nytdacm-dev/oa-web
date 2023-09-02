<script setup lang="ts">
import type { AxiosError } from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type FormInst, type FormRules, NButton, NForm, NFormItem, NInput, useNotification } from 'naive-ui'
import { useUserStore } from '@/stores/userStore'
import type { HttpResponse } from '@/shared/Http'

const notification = useNotification()
const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 位', trigger: 'blur' },
  ],
} as { [k in keyof UserLoginProps]: FormRules[k] }

interface UserLoginProps {
  username: string
  password: string
}

const formValue = ref<UserLoginProps>({
  username: '',
  password: '',
})
const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      userStore
        .login(formValue.value.username, formValue.value.password)
        .then(() => {
          router.push('/')
          notification.success({
            title: '登录成功',
            duration: 2000,
          })
        })
        .catch((e: AxiosError<HttpResponse>) => {
          notification.error({
            title: '登录失败',
            content: e.response?.data.message,
            duration: 2000,
          })
        })
    }
  })
}
</script>

<template>
  <div class="flex items-center justify-center">
    <NForm
      ref="formRef"
      :model="formValue"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
    >
      <NFormItem label="用户名" path="username">
        <NInput v-model:value="formValue.username" placeholder="用户名" />
      </NFormItem>
      <NFormItem label="密码" path="password">
        <NInput v-model:value="formValue.password" placeholder="密码" type="password" />
      </NFormItem>
      <div style="display: flex; justify-content: center">
        <NButton round type="primary" @click="handleFormSubmit">
          登录
        </NButton>
      </div>
    </NForm>
  </div>
</template>
