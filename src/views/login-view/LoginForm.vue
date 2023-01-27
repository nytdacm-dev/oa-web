<script setup lang="ts">
import type { HttpResponse } from '@/shared/Http';
import { useUserStore } from '@/stores/userStore';
import type { AxiosError } from 'axios';
import { type FormInstance, ElForm, ElFormItem, ElInput, ElButton, type FormRules, ElNotification } from 'element-plus';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore();
const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 位', trigger: 'blur' }
  ]
})

type UserLoginProps = {
  username: string
  password: string
}

const form = reactive<UserLoginProps>({
  username: '',
  password: ''
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate(async (valid) => {
    if (valid) {
      await userStore
        .login(form.username, form.password)
        .then(() => {
          router.push('/')
          ElNotification({
            title: '登录成功',
            type: 'success',
          })
        })
        .catch((e: AxiosError<HttpResponse>) => {
          ElNotification({
            title: '登录失败',
            message: e.response?.data.message,
            type: 'error'
          })
        })
    }
  })
}
</script>

<template>
  <div class="wrapper">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
