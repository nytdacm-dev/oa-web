<script setup lang="tsx">
import { onMounted, reactive, ref } from 'vue'
import {
  type DataTableColumns,
  NButton,
  NDataTable,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NPopconfirm,
  NSpace,
  useNotification,
} from 'naive-ui'
import type { AdminUser } from '@/views/admin/admin-user-view/AdminUser'
import { http } from '@/shared/Http'
import { useUserStore } from '@/stores/userStore'
import AdminUserUpdateForm from '@/views/admin/admin-user-view/AdminUserUpdateForm.vue'
import type { ListWrapper } from '@/models/models'
import UserGroupUpdateModal from '@/views/admin/admin-user-view/UserGroupUpdateModal.vue'
import Link from '@/components/Link.vue'
import { timestampToDateString } from '@/shared/utils'

const userStore = useUserStore()
const notification = useNotification()
const modalVisible = ref(false)
const updateUserId = ref(0)
const groupModalVisible = ref(false)
const groupUserId = ref(0)
interface FormValue {
  username?: string
  name?: string
  active?: boolean
  admin?: boolean
  superAdmin?: boolean
}
const formValue = ref<FormValue>({
  username: undefined,
  name: undefined,
  active: undefined,
  admin: undefined,
  superAdmin: undefined,
})
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  prefix({ itemCount }: { itemCount?: number }) {
    return `总共有 ${itemCount} 条`
  },
})
const loading = ref<boolean>(true)
const data = ref<AdminUser[]>([])
const columns: DataTableColumns<AdminUser> = [
  {
    title: 'ID',
    key: 'userId',
    minWidth: 100,
  },
  {
    title: '用户名',
    key: 'username',
    minWidth: 100,
    render(row) {
      return (
        <Link href={`/user/${row.username}`}>
          {row.username}
        </Link>
      )
    },
  },
  {
    title: '姓名',
    key: 'name',
    minWidth: 100,
  },
  {
    title: '已激活',
    key: 'active',
    minWidth: 80,
    render(row) {
      return row.active === true ? '是' : '否'
    },
  },
  {
    title: '管理员',
    key: 'admin',
    minWidth: 80,
    render(row) {
      return row.admin === true ? '是' : '否'
    },
  },
  {
    title: '超级管理员',
    key: 'superAdmin',
    minWidth: 100,
    render(row) {
      return row.superAdmin === true ? '是' : '否'
    },
  },
  {
    title: '上次活动',
    key: 'lastActive',
    minWidth: 200,
    render(row) {
      return <span>{row.lastActive ? timestampToDateString(row.lastActive) : '无'}</span>
    },
  },
  {
    title: '注册时间',
    key: 'registerTime',
    minWidth: 200,
    render(row) {
      return <span>{timestampToDateString(row.registerTime ?? 0)}</span>
    },
  },
  {
    title: '操作',
    key: 'actions',
    minWidth: 200,
    render(row) {
      return (
        <NSpace>
          {!row.active
            ? (
            <NButton size="small" onClick={() => activeUser(row.userId ?? 0)}>
              激活
            </NButton>
              )
            : null}
          <NButton
            size="small"
            onClick={() => {
              modalVisible.value = true
              updateUserId.value = row.userId ?? 0
            }}
          >
            修改
          </NButton>
          <NButton
            size="small"
            onClick={() => {
              groupModalVisible.value = true
              groupUserId.value = row.userId ?? 0
            }}
          >
            群组
          </NButton>
          {(row.superAdmin === true || row.userId === userStore.userId)
            ? null
            : (
            <NPopconfirm onPositiveClick={() => deleteUser(row.userId ?? 0)}>
              {{
                default: () => '确定删除吗？',
                trigger: () => (
                  <NButton size="small" type="error">
                    删除
                  </NButton>
                ),
              }}
            </NPopconfirm>
              )}
        </NSpace>
      )
    },
  },
]
const rowKey = (rowData: AdminUser) => {
  return rowData.userId ?? 0
}
const deleteUser = (userId: number) => {
  http.delete<void>(`/admin/user/${userId}`).then((res) => {
    notification.success({
      title: res.data.message,
      duration: 2000,
    })
  })
  handleFormSubmit()
}
onMounted(() => {
  handleFormSubmit()
})
const activeUser = (userId: number) => {
  http.patch<AdminUser>(`/admin/user/${userId}`, { active: true }).then((res) => {
    notification.success({
      title: res.data.message,
      duration: 2000,
    })
  })
  handleFormSubmit()
}
const requestData = () => {
  http
    .get<ListWrapper<AdminUser>>('/admin/user', {
      ...formValue.value,
      page: pagination.page ? pagination.page - 1 : 0,
      size: pagination.pageSize,
    })
    .then((res) => {
      const resData = res.data.data
      data.value = resData.data ?? []
      pagination.itemCount = resData.total ?? 0
    })
}
const handlePageSizeChange = (pageSize: number) => {
  if (!loading.value) {
    pagination.page = 1
    pagination.pageSize = pageSize
    loading.value = true
    requestData()
    loading.value = false
  }
}
const handlePageChange = (currentPage: number) => {
  if (!loading.value) {
    pagination.page = currentPage
    loading.value = true
    requestData()
    loading.value = false
  }
}

const handleFormSubmit = () => {
  pagination.page = 1
  loading.value = true
  requestData()
  loading.value = false
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
      ref="table"
      remote
      :row-key="rowKey"
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />
    <NModal
      :show="modalVisible"
      title="修改个人信息"
      class="custom-card"
      preset="card"
      style="width: 80%"
      @close="() => (modalVisible = false)"
    >
      <AdminUserUpdateForm :user-id="updateUserId" />
    </NModal>
    <NModal
      :show="groupModalVisible"
      title="群组列表"
      class="custom-card"
      preset="card"
      style="width: 80%"
      @close="() => (groupModalVisible = false)"
    >
      <UserGroupUpdateModal :user-id="groupUserId" />
    </NModal>
  </div>
</template>
