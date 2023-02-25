<script setup lang="ts">
import type { AxiosError } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import {
  type FormInst,
  type FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NRadio,
  useNotification,
} from 'naive-ui'
import { type HttpResponse, type JSONValue, http } from '@/shared/Http'
import type { AdminUser } from '@/views/admin/admin-user-view/AdminUser'
import type { Models } from '@/models/models'

const props = defineProps<{
  groupId: number
}>()

const notification = useNotification()

const formRef = ref<FormInst | null>(null)
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
} as { [k in keyof GroupUpdateProps]: FormRules[k] })

interface GroupUpdateProps {
  name?: string
  displayName?: string
  showInHomepage?: boolean
  homepageOrder?: number
}
const group = ref<Models.Group | undefined>()
onMounted(() => {
  http
    .get<Models.Group>(`/admin/group/${props.groupId}`)
    .then((res) => {
      group.value = res.data.data
      formValue.value.name = group.value?.name
      formValue.value.displayName = group.value?.displayName
      formValue.value.showInHomepage = group.value?.showInHomepage
      formValue.value.homepageOrder = group.value?.homepageOrder
    })
    .catch((e: AxiosError) => {
      notification.error({
        title: '获取失败',
        content: e.message,
      })
    })
})

const formValue = ref<GroupUpdateProps>({
  name: '',
  displayName: undefined,
  showInHomepage: false,
  homepageOrder: 0,
})
const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const params: GroupUpdateProps = {}
      if (formValue.value.name !== group.value?.name)
        params.name = formValue.value.name

      if (formValue.value.displayName !== group.value?.displayName)
        params.displayName = formValue.value.displayName

      if (formValue.value.showInHomepage !== group.value?.showInHomepage)
        params.showInHomepage = formValue.value.showInHomepage

      if (formValue.value.homepageOrder !== group.value?.homepageOrder)
        params.homepageOrder = formValue.value.homepageOrder

      http
        .patch<AdminUser>(`/admin/group/${props.groupId}`, params as Record<string, JSONValue>)
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
    <NFormItem label="名称" path="name">
      <NInput v-model:value="formValue.name" placeholder="名称" />
    </NFormItem>
    <NFormItem label="显示名称" path="displayName">
      <NInput v-model:value="formValue.displayName" placeholder="显示名称" />
    </NFormItem>
    <NFormItem label="首页显示" path="showInHomepage">
      <NRadio :checked="formValue.showInHomepage" @change="() => (formValue.showInHomepage = true)">
        是
      </NRadio>
      <NRadio :checked="!formValue.showInHomepage" @change="() => (formValue.showInHomepage = false)">
        否
      </NRadio>
    </NFormItem>
    <NFormItem label="首页顺序" path="homepageOrder">
      <NInputNumber v-model:value="formValue.homepageOrder" placeholder="首页顺序（数字越小越靠前）" />
    </NFormItem>
    <div style="display: flex; justify-content: center">
      <NButton round type="primary" @click="handleFormSubmit">
        修改
      </NButton>
    </div>
  </NForm>
</template>

<style lang="scss" scoped></style>
