<script setup lang="tsx">
import { reactive, ref } from 'vue'
import type { AdminUser } from "@/views/admin/admin-user-view/AdminUser";
import { http } from "@/shared/Http";
import { type Column, ElForm, ElFormItem, ElInput, ElButton, ElNotification } from "element-plus";

const form = reactive<AdminUser>({
  username: undefined,
  name: undefined,
  active: undefined,
  admin: undefined,
  superAdmin: undefined,
})
const deleteUser = (userId: number) => {
  http.delete<void>(`/admin/user/${ userId }`)
    .then(res => {
      ElNotification({
        title: res.data.message,
        position: 'top-right',
      })
    })
  onFormSubmit()
}
const activeUser = (userId: number) => {
  http.patch<AdminUser>(`/admin/user/${ userId }`, { active: true })
    .then(res => {
      ElNotification({
        title: res.data.message,
        position: 'top-right',
      })
    })
  onFormSubmit()
}
type ListWrapper<T> = {
  total?: number,
  data?: T[],
}
const tableColumns: Column[] = [
  {
    key: 'userId',
    title: 'ID',
    width: 120,
    dataKey: 'userId',
  },
  {
    key: 'username',
    title: '用户名',
    width: 200,
    dataKey: 'username',
  },
  {
    key: 'name',
    title: '姓名',
    width: 200,
    dataKey: 'name',
  },
  {
    key: 'active',
    title: '已激活',
    width: 200,
    dataKey: 'active',
  },
  {
    key: 'admin',
    title: '管理员',
    width: 200,
    dataKey: 'admin',
  },
  {
    key: 'superAdmin',
    title: '超级管理员',
    width: 200,
    dataKey: 'superAdmin',
  },
  {
    key: 'operations',
    title: '操作',
    width: 200,
    dataKey: 'userId',
    cellRenderer: ({ cellData: userId }) => (
      <>
        { !tableData.value.filter(user => user.userId === userId)[0].active ?
          <ElButton size="small" type="primary" onClick={ () => activeUser(userId) }>激活</ElButton> : null }
        <ElButton size="small">Edit</ElButton>
        <ElPopconfirm title="确定删除吗？" onConfirm={ () => deleteUser(userId) }>
          { {
            reference: () => (
              <ElButton size="small" type="danger">
                Delete
              </ElButton>
            )
          } }
        </ElPopconfirm>
      </>
    ),
  },
]
const tableData = ref<AdminUser[]>([])
const onFormSubmit = () => {
  http.get<ListWrapper<AdminUser>>('/admin/user', form as Record<string, string>)
    .then(res => {
      tableData.value = res.data.data.data ?? []
    })
}
</script>

<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onFormSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="height: 400px">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="tableColumns"
            :data="tableData"
            :width="width"
            :height="height"
            fixed
          />
        </template>
      </el-auto-resizer>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
