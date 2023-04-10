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
import { http } from '@/shared/Http'
import type { ListWrapper, Models } from '@/models/models'
import AdminGroupUpdateForm from '@/views/admin/admin-group-view/AdminGroupUpdateForm.vue'
import AdminGroupNewForm from '@/views/admin/admin-group-view/AdminGroupNewForm.vue'
import GroupMemberUpdateModal from '@/views/admin/admin-group-view/GroupMemberUpdateModal.vue'
import { timestampToDateString } from '@/shared/utils'

const notification = useNotification()
const updateGroupModalVisible = ref(false)
const newGroupModalVisible = ref(false)
const updateGroupId = ref(0)
const memberModalVisible = ref(false)
const memberGroupId = ref(0)
interface FormValue {
  name?: string
  showInHomepage?: boolean
}
const formValue = ref<FormValue>({
  name: undefined,
  showInHomepage: undefined,
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
const data = ref<Models.Group[]>([])
const columns: DataTableColumns<Models.Group> = [
  {
    title: 'ID',
    key: 'groupId',
    minWidth: 50,
  },
  {
    title: '名称',
    key: 'name',
    minWidth: 150,
  },
  {
    title: '显示名称',
    key: 'displayName',
    minWidth: 100,
  },
  {
    title: '首页显示',
    key: 'showInHomepage',
    minWidth: 100,
    render(row) {
      return row.showInHomepage === true ? '是' : '否'
    },
  },
  {
    title: '首页顺序',
    key: 'homepageOrder',
    minWidth: 100,
  },
  {
    title: '创建时间',
    key: 'registerTime',
    minWidth: 200,
    render(row) {
      return timestampToDateString(row.createdAt ?? 0)
    },
  },
  {
    title: '操作',
    key: 'actions',
    minWidth: 200,
    render(row) {
      return (
        <NSpace>
          <NButton
            size="small"
            onClick={() => {
              updateGroupModalVisible.value = true
              updateGroupId.value = row.groupId ?? 0
            }}
          >
            修改
          </NButton>
          <NButton
            size="small"
            onClick={() => {
              memberModalVisible.value = true
              memberGroupId.value = row.groupId ?? 0
            }}
          >
            成员
          </NButton>
          <NPopconfirm onPositiveClick={() => deleteUser(row.groupId ?? 0)}>
            {{
              default: () => '确定删除吗？',
              trigger: () => (
                <NButton size="small" type="error">
                  删除
                </NButton>
              ),
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]
const rowKey = (rowData: Models.Group) => {
  return rowData.groupId
}
const deleteUser = (userId: number) => {
  http.delete<void>(`/admin/group/${userId}`).then((res) => {
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

const requestData = () => {
  http
    .get<ListWrapper<Models.Group>>('/admin/group', {
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
        <NSpace>
          <NFormItem label="名称" path="name">
            <NInput v-model:value="formValue.name" placeholder="名称" />
          </NFormItem>
          <NFormItem>
            <NButton round type="primary" @click="handleFormSubmit">
              查询
            </NButton>
          </NFormItem>
        </NSpace>
      </NForm>
    </div>
    <div class="operation">
      <div class="right">
        <NButton round size="small" type="primary" @click="() => (newGroupModalVisible = true)">
          新建
        </NButton>
        <NModal
          :show="newGroupModalVisible"
          title="创建群组"
          class="custom-card"
          preset="card"
          style="width: 80%"
          @close="() => (newGroupModalVisible = false)"
        >
          <AdminGroupNewForm />
        </NModal>
      </div>
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
      :show="updateGroupModalVisible"
      title="修改群组信息"
      class="custom-card"
      preset="card"
      style="width: 80%"
      @close="() => (updateGroupModalVisible = false)"
    >
      <AdminGroupUpdateForm :group-id="updateGroupId" />
    </NModal>
    <NModal
      :show="memberModalVisible"
      title="成员列表"
      class="custom-card"
      preset="card"
      style="width: 80%"
      @close="() => (memberModalVisible = false)"
    >
      <GroupMemberUpdateModal :group-id="memberGroupId" />
    </NModal>
  </div>
</template>

<style lang="scss" scoped>
.operation {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
