<script setup lang="ts">
import type { Models } from '@/models/models';
import { http, type HttpResponse } from '@/shared/Http';
import type { AxiosError } from 'axios';
import { type FormInstance, ElForm, ElFormItem, ElInput, ElButton, type FormRules, ElNotification } from 'element-plus';
import { reactive, ref } from 'vue'

const props = defineProps<{
  user: Models.User,
}>()

const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { max: 6, message: '姓名长度最多 6 位', trigger: 'blur' },
  ],
})

type UserUpdateProps = {
  name?: string,
  codeforces?: string
}

const form = reactive<UserUpdateProps>({
  name: props.user.name,
  codeforces: props.user.socialAccount.codeforces,
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate(async (valid) => {
    if (valid) {
      const params: UserUpdateProps = {}
      if (form.name !== props.user.name) { params.name = form.name }
      if (form.codeforces !== props.user.socialAccount.codeforces) { params.codeforces = form.codeforces }
      await http
        .patch('/user', params)
        .then(() => {
          ElNotification({
            title: '修改成功',
            type: 'success',
          })
        })
        .catch((e: AxiosError<HttpResponse>) => {
          ElNotification({
            title: '修改失败',
            message: e.response?.data.message,
            type: 'error'
          })
        })
    }
  })
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Codeforces" prop="codeforces">
      <el-input v-model="form.codeforces" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>

</style>
