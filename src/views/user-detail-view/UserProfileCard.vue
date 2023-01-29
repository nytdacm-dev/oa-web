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
          <span class="name">
            {{ user?.name }}
          </span>
          <span class="username">
            @{{ user?.username }}
          </span>
        </div>
        <div class="right">
          <div class="social">
            <!-- 社交平台 -->
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <p class="cf">
            Codeforces:
            <span class="cf-rating">{{ user.socialAccount?.codeforcesRating ?? 0 }}</span>
            <span v-if="user.socialAccount?.codeforcesMaxRating != user.socialAccount?.codeforcesRating">
              (Max: <span class="cf-max-rating">{{ user.socialAccount?.codeforcesMaxRating ?? 0 }}</span>)
            </span>
            Rank: <span class="cf-rank"> {{ user.socialAccount?.codeforcesRank }} </span>
          </p>
        </div>
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
        >.name {
          font-size: 20px;
        }

        >.username {
          font-size: 14px;
        }
      }
    }

    >.bottom {
      display: flex;
      justify-content: space-between;

      .left {
        >.cf {
          font-size: 16px;

          .cf-rating,
          .cf-rank {
            color: #f50;
          }

          .cf-max-rating {
            color: #2db7f5;
          }
        }
      }

      >.right {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}
</style>
