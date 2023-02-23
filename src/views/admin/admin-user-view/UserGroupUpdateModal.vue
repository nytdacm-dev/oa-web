<script setup lang="ts">
import type { AxiosError } from 'axios'
import { onMounted, ref } from 'vue'
import { NButton, type TransferOption, useNotification } from 'naive-ui'
import { http } from '@/shared/Http'
import type { ListWrapper, Models } from '@/models/models'

const props = defineProps<{
  userId: number
}>()

const notification = useNotification()

const value = ref<number[]>([])
const options = ref<TransferOption[]>([])
onMounted(() => {
  http
    .get<ListWrapper<Models.Group>>('/admin/group')
    .then((res) => {
      const data = res.data.data.data
      options.value
        = data?.map(group => ({
          label: `${group.name}${group.displayName ? `（${group.displayName}）` : ''}`,
          value: group.groupId,
        })) ?? []
    })
    .catch((e: AxiosError) => {
      notification.error({
        title: '获取失败',
        content: e.message,
      })
    })
  http
    .get<number[]>(`/admin/user/${props.userId}/groups`)
    .then((res) => {
      value.value = res.data.data
    })
    .catch((e: AxiosError) => {
      notification.error({
        title: '获取失败',
        content: e.message,
      })
    })
})
const handleClick = () => {
  http
    .post(`/admin/user/${props.userId}/groups`, { groups: value.value })
    .then((res) => {
      notification.success({
        title: '保存成功',
        content: res.data.message,
        duration: 2000,
      })
    })
    .catch((e: AxiosError) => {
      notification.error({
        title: '保存失败',
        content: e.message,
        duration: 2000,
      })
    })
}
</script>

<template>
  <div class="wrapper">
    <NTransfer ref="transfer" v-model:value="value" :options="options" virtual-scroll />
    <NButton class="btn" round size="small" type="primary" @click="handleClick">
      保存
    </NButton>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .btn {
    margin-top: 10px;
  }
}
</style>
