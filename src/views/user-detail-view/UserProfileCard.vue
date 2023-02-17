<script setup lang="ts">
import DefaultAvatar from "@/assets/user-default-avatar.png";
import UserProfileUpdateForm from "./UserProfileUpdateForm.vue";
import type { Models } from "@/models/models";
import { http } from "@/shared/Http";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import { useRoute } from "vue-router";
import CodeforcesIcon from "@/components/icons/CodeforcesIcon.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import WebsiteIcon from "@/components/icons/WebsiteIcon.vue";
import AtCoderIcon from "@/components/icons/AtCoderIcon.vue";
import LuoguIcon from "@/components/icons/LuoguIcon.vue";
import NowcoderIcon from "@/components/icons/NowcoderIcon.vue";
import { NSkeleton, NAvatar, NButton, NModal, NIcon } from "naive-ui";
import Link from "@/components/Link.vue";
import VJudgeIcon from "@/components/icons/VJudgeIcon.vue";

const userStore = useUserStore();
const route = useRoute();
const username = route.params["username"];
const user = ref<Models.User>();
const modalVisible = ref(false);
const cfLink = ref("https://codeforces.com/profile/");
const atCoderLink = ref("https://atcoder.jp/users/");
const luoguLink = ref("https://www.luogu.com.cn/user/");
const nowcoderLink = ref("https://ac.nowcoder.com/acm/contest/profile/");
const vjudgeLink = ref("https://vjudge.net/user/");
const githubLink = ref("https://github.com/");
const websiteLink = ref();
http
  .get<Models.User>(`/user/${username}`)
  .then((res) => {
    user.value = res.data.data;
    cfLink.value = `https://codeforces.com/profile/${user.value?.socialAccount.codeforces}`;
    atCoderLink.value = `https://atcoder.jp/users/${user.value?.socialAccount.atCoder}`;
    luoguLink.value = `https://www.luogu.com.cn/user/${user.value?.socialAccount.luogu}`;
    nowcoderLink.value = `https://ac.nowcoder.com/acm/contest/profile/${user.value?.socialAccount.nowcoder}`;
    vjudgeLink.value = `https://vjudge.net/user/${user.value?.socialAccount.vjudge}`;
    githubLink.value = `https://github.com/${user.value?.socialAccount.github}`;
    websiteLink.value = user.value?.socialAccount.website;
  })
  .catch((err) => {
    // TODO: Go to 404 page
    console.log(err);
  });
</script>

<template>
  <div class="main">
    <div class="avatar">
      <NSkeleton circle size="medium" :height="90" :width="90" v-if="!user" />
      <NAvatar round :size="90" :src="DefaultAvatar" v-else />
    </div>
    <div class="profile-skeleton" v-if="!user">
      <NSkeleton text :repeat="4" />
    </div>
    <div class="profile" v-else>
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
              <Link :href="cfLink" :new-window="true" v-if="user.socialAccount.codeforces">
                <NIcon :size="20">
                  <CodeforcesIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link :href="atCoderLink" target="_blank" v-if="user.socialAccount.atCoder">
                <NIcon :size="20">
                  <AtCoderIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link :href="luoguLink" target="_blank" v-if="user.socialAccount.luogu">
                <NIcon :size="20">
                  <LuoguIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link :href="nowcoderLink" target="_blank" v-if="user.socialAccount.nowcoder">
                <NIcon :size="20">
                  <NowcoderIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link :href="vjudgeLink" target="_blank" v-if="user.socialAccount.vjudge">
                <NIcon :size="20">
                  <VJudgeIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link :href="githubLink" target="_blank" v-if="user.socialAccount.github">
                <NIcon :size="20">
                  <GitHubIcon />
                </NIcon>
              </Link>
            </div>
            <div class="icon">
              <Link :href="websiteLink" target="_blank" v-if="user.socialAccount.website">
                <NIcon :size="20">
                  <WebsiteIcon />
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
              (Max: <span class="cf-max-rating">{{ user.socialAccount?.codeforcesMaxRating ?? 0 }}</span
              >)
            </span>
            <span v-if="user.socialAccount?.codeforcesRank">
              Rank: <span class="cf-rank"> {{ user.socialAccount?.codeforcesRank }} </span>
            </span>
          </p>
        </div>
        <div class="right">
          <NButton @click="modalVisible = true" v-if="userStore.username === username">修改个人信息</NButton>
          <NModal v-model:show="modalVisible" title="修改个人信息" class="custom-card" preset="card" style="width: 80%">
            <UserProfileUpdateForm :user="user" v-if="modalVisible" />
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

    > .bottom {
      display: flex;
      justify-content: space-between;

      .left {
        > .cf {
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

      > .right {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}
</style>
