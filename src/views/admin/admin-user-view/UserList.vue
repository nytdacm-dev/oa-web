<script setup lang="tsx">
import { h, ref } from 'vue'
import type { AdminUser } from "@/views/admin/admin-user-view/AdminUser";
import { http } from "@/shared/Http";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NDataTable,
  useNotification,
  DataTableColumns,
  NPopconfirm
} from "naive-ui";

const notification = useNotification()
const formValue = ref<AdminUser>({
  username: undefined,
  name: undefined,
  active: undefined,
  admin: undefined,
  superAdmin: undefined,
})
const data = ref<AdminUser[]>([])
const columns: DataTableColumns<AdminUser> = [
  {
    title: 'ID',
    key: 'userId',
  },
  {
    title: '用户名',
    key: 'username',
  },
  {
    title: '姓名',
    key: 'name',
  },
  {
    title: '已激活',
    key: 'active',
    render(row) {
      return row.active ? '是' : '否'
    }
  },
  {
    title: '管理员',
    key: 'admin',
    render(row) {
      return row.active ? '是' : '否'
    }
  },
  {
    title: '超级管理员',
    key: 'superAdmin',
    render(row) {
      return row.active ? '是' : '否'
    }
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      // return () => (<>
      //   { !row.active ?
      //     <NButton size="small">激活</NButton>
      //     : null }
      // </>)
      return h(
        'div',
        [
          !row.active ?
            h(
              NButton,
              {
                size: 'small',
                onClick: () => activeUser(row.userId ?? 0),
              },
              { default: () => '激活' }
            )
            : null,
          h(
            NPopconfirm,
            {
              onPositiveClick: () => deleteUser(row.userId ?? 0),
            },
            {
              default: () => '确定删除吗？',
              trigger: () => h(
                NButton,
                {
                  size: 'small',
                },
                {
                  default: () => '删除'
                }
              )
            },
          )
        ]
      )
    }
  },
]
const deleteUser = (userId: number) => {
  http.delete<void>(`/admin/user/${ userId }`)
    .then(res => {
      notification.success({
        title: res.data.message,
        duration: 2000,
      })
    })
  handleFormSubmit()
}
const activeUser = (userId: number) => {
  http.patch<AdminUser>(`/admin/user/${ userId }`, { active: true })
    .then(res => {
      notification.success({
        title: res.data.message,
        duration: 2000,
      })
    })
  handleFormSubmit()
}
type ListWrapper<T> = {
  total?: number,
  data?: T[],
}
const handleFormSubmit = () => {
  http.get<ListWrapper<AdminUser>>('/admin/user', formValue.value as Record<string, string>)
    .then(res => {
      data.value = res.data.data.data ?? []
    })
}
</script>

<template>
  <div>
    <div>
      <NForm
        :model="formValue"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="small"
        inline
      >
        <NFormItem label="用户名" path="username">
          <NInput v-model:value="formValue.username" placeholder="用户名" />
        </NFormItem>
        <NFormItem label="姓名" path="name">
          <NInput v-model:value="formValue.name" placeholder="姓名" />
        </NFormItem>
        <NFormItem>
          <NButton round type="primary" @click="handleFormSubmit">
            查询
          </NButton>
        </NFormItem>
      </NForm>
    </div>
    <NDataTable
      :bordered="false"
      :columns="columns"
      :data="data"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
