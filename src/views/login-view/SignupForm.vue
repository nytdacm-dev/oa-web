<script setup lang="ts">
import type { Models } from '@/models/models';
import { http, type HttpResponse } from '@/shared/Http';
import { useUserStore } from '@/stores/userStore';
import type { AxiosError } from 'axios';
import { type FormInstance, ElForm, ElFormItem, ElInput, ElButton, type FormRules, ElNotification } from 'element-plus';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore();
const formRef = ref<FormInstance>()
const validatePasswordSame = (rule: any, value: string, callback: (error?: string | Error) => void) => {
  if (value !== form.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 位', trigger: 'blur' },
  ],
  password2: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 位', trigger: 'blur' },
    { validator: validatePasswordSame, message: '密码不一致', trigger: 'blur' },
  ],
})

type UserSignupProps = {
  username: string
  password: string
  password2: string
}

const form = reactive<UserSignupProps>({
  username: '',
  password: '',
  password2: '',
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate(async (valid) => {
    if (valid) {
      await http
        .post<Models.User>("/auth/signup", {
          username: form.username,
          password: form.password
        })
        .then(async () => {
          await userStore.login(form.username, form.password)
          await userStore.current()
          router.push('/')
          ElNotification({
            title: '注册成功',
            type: 'success',
          })
        })
        .catch((e: AxiosError<HttpResponse>) => {
          ElNotification({
            title: '注册失败',
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
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="form.password2" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">注册</el-button>
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
