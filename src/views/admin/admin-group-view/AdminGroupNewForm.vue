<script setup lang="ts">
import { http, type HttpResponse } from "@/shared/Http";
import type { AxiosError } from "axios";
import { reactive, ref } from "vue";
import { NForm, NFormItem, NInput, NButton, type FormRules, type FormInst, useNotification, NRadio } from "naive-ui";
import type { AdminUser } from "@/views/admin/admin-user-view/AdminUser";

const notification = useNotification();

const formRef = ref<FormInst | null>(null);
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
} as { [k in keyof GroupNewProps]: FormRules[k] });

type GroupNewProps = {
  name?: string;
  displayName?: string;
  showInHomepage?: boolean;
  homepageOrder?: number;
};

const formValue = ref<GroupNewProps>({
  name: "",
  displayName: undefined,
  showInHomepage: false,
  homepageOrder: 0,
});
const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      http
        .post<AdminUser>(`/admin/group`, formValue.value)
        .then((res) => {
          notification.success({
            title: res.data.message,
            duration: 2000,
          });
        })
        .catch((e: AxiosError<HttpResponse>) => {
          notification.error({
            title: "创建失败",
            content: e.response?.data.message,
            duration: 2000,
          });
        });
    }
  });
};
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
      <NRadio :checked="formValue.showInHomepage" @change="() => (formValue.showInHomepage = true)">是</NRadio>
      <NRadio :checked="!formValue.showInHomepage" @change="() => (formValue.showInHomepage = false)">否</NRadio>
    </NFormItem>
    <NFormItem label="首页顺序" path="homepageOrder">
      <NInputNumber v-model:value="formValue.homepageOrder" placeholder="首页顺序（数字越小越靠前）" />
    </NFormItem>
    <div style="display: flex; justify-content: center">
      <NButton round type="primary" @click="handleFormSubmit">创建</NButton>
    </div>
  </NForm>
</template>

<style lang="scss" scoped></style>
