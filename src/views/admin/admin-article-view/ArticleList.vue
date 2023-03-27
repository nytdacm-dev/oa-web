<script setup lang="tsx">
import { onMounted, reactive, ref } from 'vue'
import {
  type DataTableColumns,
  NButton,
  NDataTable,
  NForm,
  NFormItem,
  NPopconfirm,
  NSpace,
  useNotification,
} from 'naive-ui'
import { http } from '@/shared/Http'
import type { ListWrapper, Models } from '@/models/models'
import Link from '@/components/Link.vue'

const notification = useNotification()
interface FormValue {
  title?: string
}

const formValue = ref<FormValue>({
  title: undefined,
})
const pagination = reactive({
  page: 1,
  pageSize: 20,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [20, 50, 100, 200, 500, 1000, 2000],
  prefix({ itemCount }: { itemCount?: number }) {
    return `总共有 ${itemCount} 条`
  },
})
const publishArticle = (id: number) => {
  http
    .patch<Models.Article>(`/admin/article/${id}`, { published: true })
    .then((res) => {
      notification.success({
        title: res.data.message,
        duration: 2000,
      })
    })
    .catch((err) => {
      notification.error({
        title: '发布失败',
        content: err.response?.data.message,
        duration: 2000,
      })
    })
}
const deleteArticle = (id: number) => {
  http
    .delete<void>(`/admin/article/${id}`)
    .then((res) => {
      notification.success({
        title: res.data.message,
        duration: 2000,
      })
    })
    .catch((err) => {
      notification.error({
        title: '删除失败',
        content: err.response?.data.message,
        duration: 2000,
      })
    })
}
const loading = ref<boolean>(true)
const data = ref<Models.Article[]>([])
const columns: DataTableColumns<Models.Article> = [
  {
    title: '文章 ID',
    key: 'articleId',
  },
  {
    title: '文章标题',
    key: 'title',
    render(row) {
      return (
        <Link href={`/article/${row.articleId}`}>{row.title}</Link>
      )
    },
  },
  {
    title: '作者',
    key: 'author',
    render(row) {
      return (
        <Link href={`/user/${row.author.username}`}>{row.author.name}</Link>
      )
    },
  },
  {
    title: '已发布',
    key: 'published',
    render(row) {
      return (
        <span>{row.published ? '是' : '否'}</span>
      )
    },
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return (
        <NSpace>
          {!row.published
            ? (
              <NButton size="small" onClick={() => publishArticle(row.articleId)}>
                发布
              </NButton>)
            : null}
          <NPopconfirm onPositiveClick={() => deleteArticle(row.articleId)}>
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
onMounted(() => {
  handleFormSubmit()
})
const rowKey = (rowData: Models.Submission) => {
  return rowData.submissionId
}
const requestData = () => {
  http
    .get<ListWrapper<Models.Article>>('/admin/article', {
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
        <NFormItem label="标题" path="title">
          <NInput v-model:value="formValue.title" placeholder="标题" />
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
  </div>
</template>

<style lang="scss" scoped>
.operation {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
