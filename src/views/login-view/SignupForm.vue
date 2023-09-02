<script setup lang="ts">
import type { AxiosError } from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  type FormInst,
  type FormItemRule,
  type FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput,
  useNotification,
} from 'naive-ui'
import { useUserStore } from '@/stores/userStore'
import { type HttpResponse, http } from '@/shared/Http'
import type { Models } from '@/models/models'

const notification = useNotification()
const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInst | null>(null)
const validatePasswordSame = (rule: FormItemRule, value: string) => {
  return value === formValue.value.password
}
const rules = ref<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 位', trigger: 'blur' },
  ],
  password2: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 位', trigger: 'blur' },
    { validator: validatePasswordSame, message: '密码不一致', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { max: 6, message: '姓名长度最多 6 位', trigger: 'blur' },
  ],
} as { [k in keyof UserSignupProps]: FormRules[k] })

interface UserSignupProps {
  username: string
  password: string
  password2: string
  name: string
}

const formValue = ref<UserSignupProps>({
  username: '',
  password: '',
  password2: '',
  name: '',
})
const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      http
        .post<Models.User>('/auth/signup', {
          username: formValue.value.username,
          password: formValue.value.password,
          name: formValue.value.name,
        })
        .then(async () => {
          await userStore.login(formValue.value.username, formValue.value.password)
          await userStore.current()
          await router.push('/')
          notification.success({
            title: '注册成功',
            duration: 2000,
          })
        })
        .catch((e: AxiosError<HttpResponse>) => {
          notification.success({
            title: '注册失败',
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
      <NFormItem label="确认密码" path="password2">
        <NInput v-model:value="formValue.password2" placeholder="确认密码" type="password" />
      </NFormItem>
      <NFormItem label="姓名" path="name">
        <NInput v-model:value="formValue.name" placeholder="姓名" />
      </NFormItem>
      <p class="text-red">
        注意：用户名请使用自己的学号，否则不予通过
      </p>
      <div class="flex justify-center">
        <NButton round type="primary" @click="handleFormSubmit">
          注册
        </NButton>
      </div>
    </NForm>
  </div>
</template>
