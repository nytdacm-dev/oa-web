<script setup lang="tsx">
import { onMounted, reactive, ref } from "vue";
import type { AdminUser } from "@/views/admin/admin-user-view/AdminUser";
import { http } from "@/shared/Http";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NDataTable,
  useNotification,
  type DataTableColumns,
  NPopconfirm
} from "naive-ui";
import dayjs from "dayjs";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const notification = useNotification();
type FormValue = {
  username?: string,
  name?: string,
  active?: boolean,
  admin?: boolean,
  superAdmin?: boolean,
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
    return `总共有 ${ itemCount } 个`
  }
})
const loading = ref<boolean>(false)
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
      return row.active === true ? '是' : '否'
    }
  },
  {
    title: '管理员',
    key: 'admin',
    render(row) {
      return row.admin === true ? '是' : '否'
    }
  },
  {
    title: '超级管理员',
    key: 'superAdmin',
    render(row) {
      return row.superAdmin === true ? '是' : '否'
    }
  },
  {
    title: '注册时间',
    key: 'registerTime',
    render(row) {
      return dayjs.unix(row.registerTime ?? 0).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return (
        <div>
          { !row.active ?
            <NButton
              size="small"
              onClick={ () => activeUser(row.userId ?? 0) }
            >
              激活
            </NButton>
            : null }
          <NButton size="small">
            修改
          </NButton>
          { row.superAdmin === true || row.userId === userStore.userId ? null :
            <NPopconfirm onPositiveClick={ () => deleteUser(row.userId ?? 0) }>
              { {
                default: () => "确定删除吗？",
                trigger: () => <NButton size="small" type="error">删除</NButton>
              } }
            </NPopconfirm>
          }
        </div>
      );
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
onMounted(() => {
  handleFormSubmit()
})
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
const requestData = () => {
  loading.value = true
  http
    .get<ListWrapper<AdminUser>>('/admin/user', {
      ...formValue.value,
      page: pagination.page ? pagination.page - 1 : 0,
      size: pagination.pageSize,
    })
    .then(res => {
      const resData = res.data.data
      data.value = resData.data ?? []
      pagination.itemCount = resData.total ?? 0
    })
  loading.value = false
}
const handlePageChange = (currentPage: number) => {
  if (!loading.value) {
    pagination.page = currentPage
    requestData()
  }
}

const handleFormSubmit = () => {
  pagination.page = 1
  requestData()
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
      remote
      ref="table"
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update:page="handlePageChange"
    />
  </div>
</template>
