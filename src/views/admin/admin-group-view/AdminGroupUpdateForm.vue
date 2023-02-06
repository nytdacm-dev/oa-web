<script setup lang="ts">
import { http, type HttpResponse } from "@/shared/Http";
import type { AxiosError } from "axios";
import { onMounted, reactive, ref } from "vue";
import { NForm, NFormItem, NInput, NButton, type FormRules, type FormInst, useNotification, NRadio } from "naive-ui";
import type { AdminUser } from "@/views/admin/admin-user-view/AdminUser";
import { Models } from "@/models/models";

const props = defineProps<{
  groupId: number,
}>();

const notification = useNotification();

const formRef = ref<FormInst | null>(null);
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入名称", trigger: "blur" }
  ]
} as { [k in keyof GroupUpdateProps]: FormRules[k] });

type GroupUpdateProps = {
  name?: string,
  displayName?: string,
  showInHomepage?: boolean,
}
const group = ref<Models.Group | undefined>();
onMounted(() => {
  http
    .get<Models.Group>(`/admin/group/${ props.groupId }`)
    .then(res => {
      group.value = res.data.data;
      formValue.value.name = group.value?.name;
      formValue.value.displayName = group.value?.displayName;
      formValue.value.showInHomepage = group.value?.showInHomepage;
    })
    .catch((e: AxiosError) => {
      notification.error({
        title: "获取失败",
        content: e.message
      });
    });
});

const formValue = ref<GroupUpdateProps>({
  name: "",
  displayName: undefined,
  showInHomepage: false
});
const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const params: GroupUpdateProps = {};
      console.log(formValue.value.name, group.value?.name);
      console.log(formValue.value.displayName, group.value?.displayName);
      console.log(formValue.value.showInHomepage, group.value?.showInHomepage);
      if (formValue.value.name !== group.value?.name) {
        params.name = formValue.value.name;
      }
      if (formValue.value.displayName !== group.value?.displayName) {
        params.displayName = formValue.value.displayName;
      }
      if (formValue.value.showInHomepage !== group.value?.showInHomepage) {
        params.showInHomepage = formValue.value.showInHomepage;
      }

      http
        .patch<AdminUser>(`/admin/group/${ props.groupId }`, params)
        .then(res => {
          notification.success({
            title: res.data.message,
            duration: 2000
          });
        })
        .catch((e: AxiosError<HttpResponse>) => {
          notification.error({
            title: "修改失败",
            content: e.response?.data.message,
            duration: 2000
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
      <NRadio :checked="formValue.showInHomepage" @change="() => formValue.showInHomepage = true">是</NRadio>
      <NRadio :checked="!formValue.showInHomepage" @change="() => formValue.showInHomepage = false">否</NRadio>
    </NFormItem>
    <div style="display: flex; justify-content: center">
      <NButton round type="primary" @click="handleFormSubmit">
        修改
      </NButton>
    </div>
  </NForm>
</template>

<style lang="scss" scoped>

</style>
