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
  NModal,
  NSpace,
} from "naive-ui";
import dayjs from "dayjs";
import type { ListWrapper } from "@/models/models";
import type { Models } from "@/models/models";
import AdminGroupUpdateForm from "@/views/admin/admin-group-view/AdminGroupUpdateForm.vue";
import AdminGroupNewForm from "@/views/admin/admin-group-view/AdminGroupNewForm.vue";

const notification = useNotification();
const updateGroupModalVisible = ref(false);
const newGroupModalVisible = ref(false);
const updateGroupId = ref(0);
type FormValue = {
  name?: string;
  showInHomepage?: boolean;
};
const formValue = ref<FormValue>({
  name: undefined,
  showInHomepage: undefined,
});
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  prefix({ itemCount }: { itemCount?: number }) {
    return `总共有 ${itemCount} 条`;
  },
});
const loading = ref<boolean>(true);
const data = ref<Models.Group[]>([]);
const columns: DataTableColumns<Models.Group> = [
  {
    title: "ID",
    key: "groupId",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "显示名称",
    key: "displayName",
  },
  {
    title: "首页显示",
    key: "showInHomepage",
    render(row) {
      return row.showInHomepage === true ? "是" : "否";
    },
  },
  {
    title: "首页顺序",
    key: "homepageOrder",
  },
  {
    title: "创建时间",
    key: "registerTime",
    render(row) {
      return dayjs.unix(row.createdAt ?? 0).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return (
        <NSpace>
          <NButton
            size="small"
            onClick={() => {
              updateGroupModalVisible.value = true;
              updateGroupId.value = row.groupId ?? 0;
            }}
          >
            修改
          </NButton>
          <NButton size="small">成员</NButton>
          <NPopconfirm onPositiveClick={() => deleteUser(row.groupId ?? 0)}>
            {{
              default: () => "确定删除吗？",
              trigger: () => (
                <NButton size="small" type="error">
                  删除
                </NButton>
              ),
            }}
          </NPopconfirm>
        </NSpace>
      );
    },
  },
];
const rowKey = (rowData: Models.Group) => {
  return rowData.groupId;
};
const deleteUser = (userId: number) => {
  http.delete<void>(`/admin/group/${userId}`).then((res) => {
    notification.success({
      title: res.data.message,
      duration: 2000,
    });
  });
  handleFormSubmit();
};
onMounted(() => {
  handleFormSubmit();
});

const requestData = () => {
  http
    .get<ListWrapper<Models.Group>>("/admin/group", {
      ...formValue.value,
      page: pagination.page ? pagination.page - 1 : 0,
      size: pagination.pageSize,
    })
    .then((res) => {
      const resData = res.data.data;
      data.value = resData.data ?? [];
      pagination.itemCount = resData.total ?? 0;
    });
};
const handlePageSizeChange = (pageSize: number) => {
  if (!loading.value) {
    pagination.page = 1;
    pagination.pageSize = pageSize;
    loading.value = true;
    requestData();
    loading.value = false;
  }
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
          <NButton round type="primary" @click="handleFormSubmit"> 查询 </NButton>
        </NFormItem>
      </NForm>
    </div>
    <div class="operation">
      <div class="right">
        <NButton round size="small" type="primary" @click="() => (newGroupModalVisible = true)"> 新建 </NButton>
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
      remote
      ref="table"
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
      <AdminGroupUpdateForm :groupId="updateGroupId" />
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
