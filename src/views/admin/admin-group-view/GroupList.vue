<script setup lang="tsx">
import { onMounted, reactive, ref } from "vue";
import { http } from "@/shared/Http";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NDataTable,
  useNotification,
  type DataTableColumns,
  NPopconfirm,
  NModal
} from "naive-ui";
import dayjs from "dayjs";
import type { ListWrapper } from "@/models/models";

type GroupDto = {
  groupId: number,
  name: string,
  showInHomepage: boolean,
  createdAt: number,
}
const notification = useNotification();
const modalVisible = ref(false);
const updateGroupId = ref(0);
type FormValue = {
  name?: string,
  showInHomepage?: boolean,
}
const formValue = ref<FormValue>({
  name: undefined,
  showInHomepage: undefined
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
const data = ref<GroupDto[]>([]);
const columns: DataTableColumns<GroupDto> = [
  {
    title: "ID",
    key: "groupId"
  },
  {
    title: "名称",
    key: "name"
  },
  {
    title: "首页显示",
    key: "showInHomepage",
    render(row) {
      return row.showInHomepage === true ? "是" : "否";
    }
  },
  {
    title: "创建时间",
    key: "registerTime",
    render(row) {
      return dayjs.unix(row.createdAt ?? 0).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return (
        <div>
          <NButton size="small" onClick={ () => {
            modalVisible.value = true;
            updateGroupId.value = row.groupId ?? 0;
          } }>
            修改
          </NButton>
          <NPopconfirm onPositiveClick={ () => deleteUser(row.groupId ?? 0) }>
            { {
              default: () => "确定删除吗？",
              trigger: () => <NButton size="small" type="error">删除</NButton>
            } }
          </NPopconfirm>
        </div>
      );
    }
  }
];
const deleteUser = (userId: number) => {
  http.delete<void>(`/admin/group/${ userId }`)
    .then(res => {
      notification.success({
        title: res.data.message,
        duration: 2000
      });
    });
  handleFormSubmit();
};
onMounted(() => {
  handleFormSubmit();
});

const requestData = () => {
  http
    .get<ListWrapper<GroupDto>>("/admin/group", {
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
        <NFormItem label="名称" path="name">
          <NInput v-model:value="formValue.name" placeholder="名称" />
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
    <NModal :show="modalVisible" title="修改群组信息"
            class="custom-card"
            preset="card"
            style="width: 80%"
            @close="() => modalVisible = false">
      <!--<AdminUserUpdateForm :userId="updateGroupId" />-->
    </NModal>
  </div>
</template>
