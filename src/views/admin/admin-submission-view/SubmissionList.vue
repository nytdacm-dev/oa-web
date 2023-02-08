<script setup lang="tsx">
import { onMounted, reactive, ref } from "vue";
import { http } from "@/shared/Http";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NDataTable,
  type DataTableColumns,
} from "naive-ui";
import dayjs from "dayjs";
import type { ListWrapper } from "@/models/models";
import type { Models } from "@/models/models";

type FormValue = {
  oj?: string,
}
const formValue = ref<FormValue>({
  oj: undefined,
});
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  prefix({ itemCount }: { itemCount?: number }) {
    return `总共有 ${ itemCount } 个`;
  }
});
const loading = ref<boolean>(true);
const data = ref<Models.Submission[]>([]);
const columns: DataTableColumns<Models.Submission> = [
  {
    title: "提交人",
    key: "user",
    render(row) {
      return (
        <a href={ `/#/user/${ row.user?.username }` } target="_blank">
          { `${ row.user?.username } （${ row.user?.name }）` }
        </a>
      )
    },
  },
  {
    title: "题目名称",
    key: "name",
  },
  {
    title: "题目编号",
    key: "remoteProblemId",
  },
  {
    title: "OJ",
    key: "oj",
  },
  {
    title: "提交 ID",
    key: "remoteSubmissionId",
  },
  {
    title: "状态",
    key: "status",
  },
  {
    title: "编程语言",
    key: "language",
  },
  {
    title: "提交时间",
    key: "submitTime",
    render(row) {
      return dayjs.unix(row.submitTime ?? 0).format("YYYY-MM-DD HH:mm:ss");
    },
  },
];
onMounted(() => {
  handleFormSubmit();
});

const requestData = () => {
  http
    .get<ListWrapper<Models.Submission>>("/admin/submission", {
      ...formValue.value,
      page: pagination.page ? pagination.page - 1 : 0,
      size: pagination.pageSize
    })
    .then(res => {
      const resData = res.data.data;
      data.value = resData.data ?? [];
      pagination.itemCount = resData.total ?? 0;
    });
};
const handlePageChange = (currentPage: number) => {
  if (!loading.value) {
    pagination.page = currentPage;
    loading.value = true;
    requestData();
    loading.value = false;
  }
};

const handleFormSubmit = () => {
  pagination.page = 1;
  loading.value = true;
  requestData();
  loading.value = false;
};
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
          <NInput v-model:value="formValue.oj" placeholder="OJ平台" />
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

<style lang="scss" scoped>
</style>
