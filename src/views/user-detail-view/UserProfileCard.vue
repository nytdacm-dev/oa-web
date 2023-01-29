<script setup lang="ts">
import DefaultAvatar from '@/assets/user-default-avatar.png'
import type { Models } from '@/models/models';
import { http } from '@/shared/Http';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore()
const route = useRoute()
const username = route.params['username']
const user = ref<Models.User>()
http.get<Models.User>(`/user/${username}`)
  .then(res => user.value = res.data.data)
  .catch(err => {
    // TODO: Go to 404 page
    console.log(err)
  })
</script>

<template>
  <div class="main">
    <div class="avatar">
      <el-skeleton style="--el-skeleton-circle-size: 100px" v-if="!user">
        <template #template>
          <el-skeleton-item variant="circle" />
        </template>
      </el-skeleton>
      <el-avatar :size="90" :src="DefaultAvatar" v-else />
    </div>
    <el-skeleton v-if="!user" />
    <div class="profile" v-else>
      <div class="top">
        <div class="left">
          <h1 class="username">
            {{ user?.name }}
          </h1>
        </div>
        <div class="right">
          <div class="social">
            <!-- 社交平台 -->
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left"></div>
        <div class="right">
          <el-button plain v-if="userStore.username === username">修改个人信息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  background-color: #fff;
  padding: 2.5rem;

  >.avatar {
    margin-right: 2rem;
  }

  >.profile {
    flex: 1 1 auto;

    >.top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;

      >.left {
        >.username {
          font-size: 20px;
        }
      }
    }

    >.bottom {
      display: flex;
      justify-content: space-between;

      >.right {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}
</style>
