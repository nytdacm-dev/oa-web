<script setup lang="ts">
import DefaultAvatar from '@/assets/user-default-avatar.png'
import UserProfileUpdateForm from './UserProfileUpdateForm.vue';
import type { Models } from '@/models/models';
import { http } from '@/shared/Http';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Codeforces from "@/components/icons/Codeforces.vue";
import GitHub from "@/components/icons/GitHub.vue";
import Website from "@/components/icons/Website.vue";
import AtCoder from "@/components/icons/AtCoder.vue";

const userStore = useUserStore()
const route = useRoute()
const username = route.params['username']
const user = ref<Models.User>()
const dialogVisible = ref(false)
const cfLink = ref('https://codeforces.com/profile/')
const atCoderLink = ref('https://atcoder.jp/users/')
const githubLink = ref('https://github.com/')
const websiteLink = ref()
http.get<Models.User>(`/user/${ username }`)
  .then(res => {
    user.value = res.data.data
    cfLink.value = `https://codeforces.com/profile/${ user.value?.socialAccount.codeforces }`
    atCoderLink.value = `https://atcoder.jp/users/${ user.value?.socialAccount.atCoder }`
    githubLink.value = `https://github.com/${ user.value?.socialAccount.github }`
    websiteLink.value = user.value?.socialAccount.website
  })
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
            <div class="icon">
              <el-link :underline="false" :href="cfLink" v-if="user.socialAccount.codeforces">
                <el-icon :size="20">
                  <Codeforces />
                </el-icon>
              </el-link>
            </div>
            <div class="icon">
              <el-link :underline="false" :href="atCoderLink" v-if="user.socialAccount.atCoder">
                <el-icon :size="20">
                  <AtCoder />
                </el-icon>
              </el-link>
            </div>
            <div class="icon">
              <el-link :underline="false" :href="githubLink" v-if="user.socialAccount.github">
                <el-icon :size="20">
                  <GitHub />
                </el-icon>
              </el-link>
            </div>
            <div class="icon">
              <el-link :underline="false" :href="websiteLink" v-if="user.socialAccount.website">
                <el-icon :size="20">
                  <Website />
                </el-icon>
              </el-link>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <p class="cf">
            Codeforces:
            <span class="cf-rating">{{ user.socialAccount?.codeforcesRating ?? 0 }}</span>
            <span v-if="user.socialAccount?.codeforcesMaxRating !== user.socialAccount?.codeforcesRating">
              (Max: <span class="cf-max-rating">{{ user.socialAccount?.codeforcesMaxRating ?? 0 }}</span>)
            </span>
            <span v-if="user.socialAccount?.codeforcesRank">
              Rank: <span class="cf-rank"> {{ user.socialAccount?.codeforcesRank }} </span>
            </span>
          </p>
        </div>
        <div class="right">
          <el-button plain v-if="userStore.username === username" @click="dialogVisible = true">修改个人信息</el-button>
          <el-dialog v-model="dialogVisible" title="修改个人信息" width="80%">
            <user-profile-update-form :user="user" v-if="dialogVisible" />
          </el-dialog>
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

      > .left {
        > .name {
          font-size: 20px;
        }

        > .username {
          font-size: 14px;
        }
      }

      > .right {
        .social {
          display: flex;

          > .icon {
            margin-left: 5px;
          }
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
