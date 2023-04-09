<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { NAvatar, NButton, NIcon, NModal, NSkeleton } from 'naive-ui'
import UserProfileUpdateForm from './UserProfileUpdateForm.vue'
import DefaultAvatar from '@/assets/user-default-avatar.png'
import type { Models } from '@/models/models'
import { http } from '@/shared/Http'
import { useUserStore } from '@/stores/userStore'
import CodeforcesIcon from '@/components/icons/CodeforcesIcon.vue'
import AtCoderIcon from '@/components/icons/AtCoderIcon.vue'
import LuoguIcon from '@/components/icons/LuoguIcon.vue'
import NowcoderIcon from '@/components/icons/NowcoderIcon.vue'
import Link from '@/components/Link.vue'
import VJudgeIcon from '@/components/icons/VJudgeIcon.vue'

const userStore = useUserStore()
const route = useRoute()
const username = route.params.username
const user = ref<Models.User>()
const modalVisible = ref(false)
const cfLink = ref('https://codeforces.com/profile/')
const atCoderLink = ref('https://atcoder.jp/users/')
const luoguLink = ref('https://www.luogu.com.cn/user/')
const nowcoderLink = ref('https://ac.nowcoder.com/acm/contest/profile/')
const vjudgeLink = ref('https://vjudge.net/user/')
http
  .get<Models.User>(`/user/${username}`)
  .then((res) => {
    user.value = res.data.data
    cfLink.value = `https://codeforces.com/profile/${user.value?.socialAccount.codeforces}`
    atCoderLink.value = `https://atcoder.jp/users/${user.value?.socialAccount.atCoder}`
    luoguLink.value = `https://www.luogu.com.cn/user/${user.value?.socialAccount.luogu}`
    nowcoderLink.value = `https://ac.nowcoder.com/acm/contest/profile/${user.value?.socialAccount.nowcoder}`
    vjudgeLink.value = `https://vjudge.net/user/${user.value?.socialAccount.vjudge}`
  })
  .catch(() => {
    // TODO: Go to 404 page
  })
</script>

<template>
  <div class="main">
    <div class="avatar">
      <NSkeleton v-if="!user" circle size="medium" :height="90" :width="90" />
      <NAvatar v-else round :size="90" :src="DefaultAvatar" />
    </div>
    <div v-if="!user" class="profile-skeleton">
      <NSkeleton text :repeat="4" />
    </div>
    <div v-else class="profile">
      <div class="top">
        <div class="left">
          <span class="name">
            {{ user?.name }}
          </span>
          <span class="username"> @{{ user?.username }} </span>
        </div>
        <div class="right">
          <div class="social">
            <div class="icon">
              <Link v-if="user.socialAccount.codeforces" :href="cfLink" :new-window="true">
                <NIcon :size="20">
                  <CodeforcesIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link v-if="user.socialAccount.atCoder" :href="atCoderLink" target="_blank">
                <NIcon :size="20">
                  <AtCoderIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link v-if="user.socialAccount.luogu" :href="luoguLink" target="_blank">
                <NIcon :size="20">
                  <LuoguIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link v-if="user.socialAccount.nowcoder" :href="nowcoderLink" target="_blank">
                <NIcon :size="20">
                  <NowcoderIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link v-if="user.socialAccount.vjudge" :href="vjudgeLink" target="_blank">
                <NIcon :size="20">
                  <VJudgeIcon />
                </NIcon>
              </Link>
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
          <NButton v-if="userStore.username === username" @click="modalVisible = true">
            修改个人信息
          </NButton>
          <NModal v-model:show="modalVisible" title="修改个人信息" class="custom-card" preset="card" style="width: 80%">
            <UserProfileUpdateForm v-if="modalVisible" :user="user" />
          </NModal>
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

  > .avatar {
    margin-right: 2rem;
  }

  > .profile,
  .profile-skeleton {
    flex: 1 1 auto;

    > .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;

      > .left {
        > .name {
          font-size: 1.2rem;
        }

        > .username {
          font-size: 1rem;
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

    > .bottom {
      display: flex;
      justify-content: space-between;

      .left {
        > .cf {
          font-size: 1rem;

          .cf-rating,
          .cf-rank {
            color: #f50;
          }

          .cf-max-rating {
            color: #2db7f5;
          }
        }
      }

      > .right {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}
</style>
