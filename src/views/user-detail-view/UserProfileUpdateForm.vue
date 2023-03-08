<script setup lang="ts">
import type { AxiosError } from 'axios'
import { reactive, ref } from 'vue'
import { type FormInst, type FormRules, NButton, NForm, NFormItem, NInput, useNotification } from 'naive-ui'
import { type HttpResponse, type JSONValue, http } from '@/shared/Http'
import type { Models } from '@/models/models'

const props = defineProps<{
  user: Models.User
}>()

const notification = useNotification()

const formRef = ref<FormInst | null>(null)
const rules = reactive<FormRules>({
} as { [k in keyof UserUpdateProps]: FormRules[k] })

interface UserUpdateProps {
  codeforces?: string
  atCoder?: string
  luogu?: string
  nowcoder?: string
  vjudge?: string
}

const formValue = ref<UserUpdateProps>({
  codeforces: props.user.socialAccount.codeforces,
  atCoder: props.user.socialAccount.atCoder,
  luogu: props.user.socialAccount.luogu,
  nowcoder: props.user.socialAccount.nowcoder,
  vjudge: props.user.socialAccount.vjudge,
})
const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const params: UserUpdateProps = {}
      if (formValue.value.codeforces !== props.user.socialAccount.codeforces)
        params.codeforces = formValue.value.codeforces

      if (formValue.value.atCoder !== props.user.socialAccount.atCoder)
        params.atCoder = formValue.value.atCoder

      if (formValue.value.luogu !== props.user.socialAccount.luogu)
        params.luogu = formValue.value.luogu

      if (formValue.value.nowcoder !== props.user.socialAccount.nowcoder)
        params.nowcoder = formValue.value.nowcoder

      if (formValue.value.vjudge !== props.user.socialAccount.vjudge)
        params.vjudge = formValue.value.vjudge

      http
        .patch('/user', params as Record<string, JSONValue>)
        .then(() => {
          notification.success({
            title: '修改成功',
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
    <NFormItem label="Codeforces" prop="codeforces">
      <NInput v-model:value="formValue.codeforces" placeholder="Codeforces 账号" />
    </NFormItem>
    <NFormItem label="AtCoder" prop="atCoder">
      <NInput v-model:value="formValue.atCoder" placeholder="AtCoder 账号" />
    </NFormItem>
    <NFormItem label="洛谷" prop="luogu">
      <NInput v-model:value="formValue.luogu" placeholder="洛谷 ID（为数字，从个人主页的地址栏获取，如 644058）" />
    </NFormItem>
    <NFormItem label="牛客" prop="nowcoder">
      <NInput
        v-model:value="formValue.nowcoder"
        placeholder="牛客 ID（为数字，从个人主页的地址栏获取，如 444598457）"
      />
    </NFormItem>
    <NFormItem label="vjudge" prop="vjudge">
      <NInput v-model:value="formValue.vjudge" placeholder="Virtual Judge 账号" />
    </NFormItem>
    <div style="display: flex; justify-content: center">
      <NButton round type="primary" @click="handleFormSubmit">
        修改
      </NButton>
    </div>
  </NForm>
</template>

<style lang="scss" scoped></style>
