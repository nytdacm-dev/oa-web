<script setup lang="tsx">
import { onMounted, reactive, ref } from 'vue'
import { type DataTableColumns, NButton, NDataTable, NForm, NFormItem, NSelect } from 'naive-ui'
import dayjs from 'dayjs'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { http } from '@/shared/Http'
import type { ListWrapper, Models } from '@/models/models'
import Link from '@/components/Link.vue'

interface FormValue {
  oj?: string
  group?: number
  user?: string
}
const formValue = ref<FormValue>({
  oj: undefined,
  group: undefined,
  user: undefined,
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
const loading = ref<boolean>(true)
const data = ref<Models.Submission[]>([])
const columns: DataTableColumns<Models.Submission> = [
  {
    title: '提交人',
    key: 'user',
    render(row) {
      return (
        <Link href={`/user/${row.user?.username}`} newWindow={true}>
          {row.user?.name}
        </Link>
      )
    },
  },
  {
    title: '题目名称',
    key: 'name',
    render(row) {
      switch (row.oj) {
        case 'codeforces':
          return (
            <Link
              href={`https://codeforces.com/problemset/problem/${row.contestId}/${row.remoteProblemId.replace(
                row.contestId,
                '',
              )}`}
              newWindow={true}
            >
              {row.name}
            </Link>
          )
        case 'codeforces_gym':
          return (
            <Link
              href={`https://codeforces.com/gym/${row.contestId}/problem/${row.remoteProblemId.replace(
                row.contestId,
                '',
              )}`}
              newWindow={true}
            >
              {row.name}
            </Link>
          )
        case 'nowcoder':
          return (
            <Link href={`https://ac.nowcoder.com/acm/problem/${row.remoteProblemId}`} newWindow={true}>
              {row.name}
            </Link>
          )
        case 'atcoder':
          return (
            <Link href={`https://atcoder.jp/contests/${row.contestId}/tasks/${row.remoteProblemId}`} newWindow={true}>
              请进入题目内部查看！
            </Link>
          )
        default:
          return <span>{row.name}</span>
      }
    },
  },
  {
    title: '题目编号',
    key: 'remoteProblemId',
    render(row) {
      switch (row.oj) {
        case 'codeforces':
          return (
            <Link
              href={`https://codeforces.com/problemset/problem/${row.contestId}/${row.remoteProblemId.replace(
                row.contestId,
                '',
              )}`}
              newWindow={true}
            >
              {row.remoteProblemId}
            </Link>
          )
        case 'codeforces_gym':
          return (
            <Link
              href={`https://codeforces.com/gym/${row.contestId}/problem/${row.remoteProblemId.replace(
                row.contestId,
                '',
              )}`}
              newWindow={true}
            >
              {row.remoteProblemId}
            </Link>
          )
        case 'nowcoder':
          return (
            <Link href={`https://ac.nowcoder.com/acm/problem/${row.remoteProblemId}`} newWindow={true}>
              {row.remoteProblemId}
            </Link>
          )
        case 'atcoder':
          return (
            <Link href={`https://atcoder.jp/contests/${row.contestId}/tasks/${row.remoteProblemId}`} newWindow={true}>
              {row.remoteProblemId}
            </Link>
          )
        default:
          return <span>{row.remoteProblemId}</span>
      }
    },
  },
  {
    title: 'OJ',
    key: 'oj',
    render(row) {
      switch (row.oj) {
        case 'codeforces':
          return (
            <Link href="https://codeforces.com" newWindow={true}>
              Codeforces
            </Link>
          )
        case 'codeforces_gym':
          return (
            <Link href="https://codeforces.com" newWindow={true}>
              Codeforces Gym
            </Link>
          )
        case 'nowcoder':
          return (
            <Link href="https://ac.nowcoder.com" newWindow={true}>
              牛客
            </Link>
          )
        case 'atcoder':
          return (
            <Link href="https://atcoder.jp" newWindow={true}>
              AtCoder
            </Link>
          )
        default:
          return <span>{row.oj}</span>
      }
    },
  },
  {
    title: '提交 ID',
    key: 'remoteSubmissionId',
    render(row) {
      switch (row.oj) {
        case 'codeforces':
          return (
            <Link
              href={`https://codeforces.com/contest/${row.contestId}/submission/${row.remoteSubmissionId}`}
              newWindow={true}
            >
              {row.remoteSubmissionId}
            </Link>
          )
        case 'codeforces_gym':
          return (
            <Link
              href={`https://codeforces.com/gym/${row.contestId}/submission/${row.remoteSubmissionId}`}
              newWindow={true}
            >
              {row.remoteSubmissionId}
            </Link>
          )
        case 'nowcoder':
          return (
            <Link
              href={`https://ac.nowcoder.com/acm/contest/view-submission?submissionId=${row.remoteSubmissionId}`}
              newWindow={true}
            >
              {row.remoteSubmissionId}
            </Link>
          )
        case 'atcoder':
          return (
            <Link
              href={`https://atcoder.jp/contests/${row.contestId}/submissions/${row.remoteSubmissionId}`}
              newWindow={true}
            >
              {row.remoteSubmissionId}
            </Link>
          )
        default:
          return <span>{row.remoteSubmissionId}</span>
      }
    },
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      const status = row.status
      switch (status) {
        case 'OK':
          return <span style="color: #64c3a8">通过</span>
        case 'WRONG_ANSWER':
          return <span style="color: red">答案错误</span>
        case 'COMPILATION_ERROR':
          return <span style="color: red">编译错误</span>
        case 'TIME_LIMIT_EXCEEDED':
          return <span>运行超时</span>
        case 'MEMORY_LIMIT_EXCEEDED':
          return <span>内存超限</span>
        default:
          return <span>运行时错误</span>
      }
    },
  },
  {
    title: '编程语言',
    key: 'language',
  },
  {
    title: '提交时间',
    key: 'submitTime',
    render(row) {
      return dayjs.unix(row.submitTime ?? 0).format('YYYY-MM-DD HH:mm:ss')
    },
  },
]
const rowKey = (rowData: Models.Submission) => {
  return rowData.submissionId
}
onMounted(() => {
  handleFormSubmit()
  http.get<ListWrapper<Models.Group>>('/admin/group').then((res) => {
    const resData = res.data.data
    groupOptions.value = [
      {
        label: '全部',
        value: undefined,
      },
    ]
    groupOptions.value.push(
      ...(resData.data?.map(item => ({
        label: `${item.name}${item.displayName ? `（${item.displayName}）` : ''}`,
        value: item.groupId,
      })) ?? []),
    )
  })
})
const groupOptions = ref<SelectMixedOption[]>([])
const ojOptions = ref<SelectMixedOption[]>([
  {
    label: '全部',
    value: undefined,
  },
  {
    label: 'Codeforces',
    value: 'codeforces',
  },
  {
    label: '牛客',
    value: 'nowcoder',
  },
  {
    label: 'AtCoder',
    value: 'atcoder',
  },
  {
    label: 'Vjudge',
    value: 'vjudge',
  },
])
const download = () => {
  downloadBtnDisabled.value = true
  http.get(
    '/admin/submission/download',
    {
      ...formValue.value,
    },
    {
      responseType: 'blob',
    },
  )
  setTimeout(() => {
    downloadBtnDisabled.value = false
  }, 5000)
}
const downloadBtnDisabled = ref(false)
const requestData = () => {
  http
    .get<ListWrapper<Models.Submission>>('/admin/submission', {
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
        <NFormItem label="OJ" path="oj">
          <NSelect v-model:value="formValue.oj" placeholder="OJ 平台" :options="ojOptions" style="width: 120px" />
        </NFormItem>
        <NFormItem label="群组" path="group">
          <NSelect v-model:value="formValue.group" placeholder="群组" :options="groupOptions" style="width: 200px" />
        </NFormItem>
        <NFormItem label="用户" path="user">
          <NInput v-model:value="formValue.user" placeholder="用户名或姓名" />
        </NFormItem>
        <NFormItem>
          <NButton round type="primary" @click="handleFormSubmit">
            查询
          </NButton>
        </NFormItem>
      </NForm>
    </div>
    <div class="operation">
      <!-- 下载 -->
      <NButton round size="small" type="primary" :disabled="downloadBtnDisabled" @click="download">
        下载
      </NButton>
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
