<script setup lang="ts">
import type { AxiosError } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { type FormInst, type FormRules, NButton, NForm, NFormItem, NInput, NRadio, useNotification } from 'naive-ui'
import { type HttpResponse, type JSONValue, http } from '@/shared/Http'
import type { AdminUser } from '@/views/admin/admin-user-view/AdminUser'

const props = defineProps<{
  userId: number
}>()

const notification = useNotification()

const formRef = ref<FormInst | null>(null)
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { max: 6, message: '姓名长度最多 6 位', trigger: 'blur' },
  ],
  newPassword: [{ min: 6, message: '密码长度至少为 6 位', trigger: 'blur' }],
} as { [k in keyof UserUpdateProps]: FormRules[k] })

interface UserUpdateProps {
  name?: string
  password?: string
  newPassword?: string
  active?: boolean
  admin?: boolean
  superAdmin?: boolean
}
const user = ref<AdminUser | undefined>()
onMounted(() => {
  http
    .get<AdminUser>(`/admin/user/${props.userId}`)
    .then((res) => {
      user.value = res.data.data
      formValue.value.name = user.value?.name
      formValue.value.active = user.value?.active
      formValue.value.admin = user.value?.admin
      formValue.value.superAdmin = user.value?.superAdmin
    })
    .catch((e: AxiosError) => {
      notification.error({
        title: '获取失败',
        content: e.message,
      })
    })
})

const formValue = ref<UserUpdateProps>({
  name: '',
  newPassword: undefined,
  active: false,
  admin: false,
  superAdmin: false,
})
const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const params: UserUpdateProps = {}
      if (formValue.value.name !== user.value?.name)
        params.name = formValue.value.name

      if (formValue.value.newPassword)
        params.password = formValue.value.newPassword

      if (formValue.value.active !== user.value?.active)
        params.active = formValue.value.active

      if (formValue.value.admin !== user.value?.admin)
        params.admin = formValue.value.admin

      if (formValue.value.superAdmin !== user.value?.superAdmin)
        params.superAdmin = formValue.value.superAdmin

      http
        .patch<AdminUser>(`/admin/user/${props.userId}`, params as Record<string, JSONValue>)
        .then((res) => {
          notification.success({
            title: res.data.message,
            duration: 2000,
          })
        })
        .catch((e: AxiosError<HttpResponse>) => {
          notification.error({
            title: '修改失败',
            content: e.response?.data.message,
            duration: 2000,
          })
        })
    }
  })
}
</script>

<template>
  <NForm
    ref="formRef"
    :model="formValue"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    size="medium"
  >
    <NFormItem label="姓名" path="name">
      <NInput v-model:value="formValue.name" placeholder="姓名" />
    </NFormItem>
    <NFormItem label="修改密码" path="newPassword">
      <NInput v-model:value="formValue.newPassword" placeholder="修改密码" type="password" />
    </NFormItem>
    <NFormItem label="已激活" path="active">
      <NRadio :checked="formValue.active" @change="() => (formValue.active = true)">
        是
      </NRadio>
      <NRadio :checked="!formValue.active" @change="() => (formValue.active = false)">
        否
      </NRadio>
    </NFormItem>
    <NFormItem label="管理员" path="admin">
      <NRadio :checked="formValue.admin" @change="() => (formValue.admin = true)">
        是
      </NRadio>
      <NRadio :checked="!formValue.admin" @change="() => (formValue.admin = false)">
        否
      </NRadio>
    </NFormItem>
    <NFormItem label="超级管理员" path="superAdmin">
      <NRadio :checked="formValue.superAdmin" @change="() => (formValue.superAdmin = true)">
        是
      </NRadio>
      <NRadio :checked="!formValue.superAdmin" @change="() => (formValue.superAdmin = false)">
        否
      </NRadio>
    </NFormItem>
    <div style="display: flex; justify-content: center">
      <NButton round type="primary" @click="handleFormSubmit">
        修改
      </NButton>
    </div>
  </NForm>
</template>
