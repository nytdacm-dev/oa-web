<script setup lang="ts">
import type { Models } from "@/models/models";
import { http, type HttpResponse } from "@/shared/Http";
import type { AxiosError } from "axios";
import { reactive, ref } from "vue";
import { NForm, NFormItem, NInput, NButton, type FormRules, type FormInst, useNotification } from "naive-ui";

const props = defineProps<{
  user: Models.User;
}>();

const notification = useNotification();

const formRef = ref<FormInst | null>(null);
const validateWebsite = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback();
  } else if (value.startsWith("http://") || value.startsWith("https://")) {
    callback();
  } else {
    callback(new Error("你输入的不是网址"));
  }
};
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { max: 6, message: "姓名长度最多 6 位", trigger: "blur" },
  ],
  website: [{ validator: validateWebsite, trigger: "blur" }],
} as { [k in keyof UserUpdateProps]: FormRules[k] });

type UserUpdateProps = {
  name?: string;
  codeforces?: string;
  github?: string;
  website?: string;
  atCoder?: string;
  luogu?: string;
  nowcoder?: string;
  poj?: string;
  vjudge?: string;
};

const formValue = ref<UserUpdateProps>({
  name: props.user.name,
  codeforces: props.user.socialAccount.codeforces,
  atCoder: props.user.socialAccount.atCoder,
  poj: props.user.socialAccount.poj,
  luogu: props.user.socialAccount.luogu,
  nowcoder: props.user.socialAccount.nowcoder,
  github: props.user.socialAccount.github,
  website: props.user.socialAccount.website,
  vjudge: props.user.socialAccount.vjudge,
});
const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const params: UserUpdateProps = {};
      if (formValue.value.name !== props.user.name) {
        params.name = formValue.value.name;
      }
      if (formValue.value.codeforces !== props.user.socialAccount.codeforces) {
        params.codeforces = formValue.value.codeforces;
      }
      if (formValue.value.atCoder !== props.user.socialAccount.atCoder) {
        params.atCoder = formValue.value.atCoder;
      }
      if (formValue.value.poj !== props.user.socialAccount.poj) {
        params.poj = formValue.value.poj;
      }
      if (formValue.value.luogu !== props.user.socialAccount.luogu) {
        params.luogu = formValue.value.luogu;
      }
      if (formValue.value.nowcoder !== props.user.socialAccount.nowcoder) {
        params.nowcoder = formValue.value.nowcoder;
      }
      if (formValue.value.vjudge !== props.user.socialAccount.vjudge) {
        params.vjudge = formValue.value.vjudge;
      }
      if (formValue.value.github !== props.user.socialAccount.github) {
        params.github = formValue.value.github;
      }
      if (formValue.value.website !== props.user.socialAccount.website) {
        params.website = formValue.value.website;
      }
      http
        .patch("/user", params)
        .then(() => {
          notification.success({
            title: "修改成功",
            duration: 2000,
          });
        })
        .catch((e: AxiosError<HttpResponse>) => {
          notification.error({
            title: "修改失败",
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
    <NFormItem label="姓名" path="name">
      <NInput v-model:value="formValue.name" placeholder="姓名" />
    </NFormItem>
    <NFormItem label="Codeforces" prop="codeforces">
      <NInput v-model:value="formValue.codeforces" placeholder="Codeforces 账号" />
    </NFormItem>
    <NFormItem label="AtCoder" prop="atCoder">
      <NInput v-model:value="formValue.atCoder" placeholder="AtCoder 账号" />
    </NFormItem>
    <NFormItem label="POJ" prop="poj">
      <NInput v-model:value="formValue.poj" placeholder="POJ 账号" />
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
    <NFormItem label="GitHub" prop="github">
      <NInput v-model:value="formValue.github" placeholder="GitHub 账号" />
    </NFormItem>
    <NFormItem label="个人网站" prop="website">
      <NInput v-model:value="formValue.website" placeholder="个人网站链接" />
    </NFormItem>
    <div style="display: flex; justify-content: center">
      <NButton round type="primary" @click="handleFormSubmit"> 修改 </NButton>
    </div>
  </NForm>
</template>

<style lang="scss" scoped></style>
