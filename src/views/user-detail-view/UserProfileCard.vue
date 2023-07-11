<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NAvatar, NButton, NIcon, NModal, NSkeleton, NSpace } from 'naive-ui'
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
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const username = route.params.username
const user = ref<Models.User>()
const modalVisible = ref(false)
const cfLink = ref('https://codeforces.com/profile/')
const atCoderLink = ref('https://atcoder.jp/users/')
const luoguLink = ref('https://www.luogu.com.cn/user/')
const nowcoderLink = ref('https://ac.nowcoder.com/acm/contest/profile/')
const vjudgeLink = ref('https://vjudge.net/user/')
onMounted(() => {
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
      router.push('/404')
    })
})
</script>

<template>
  <div class="flex bg-white p-6" :class="isMobile ? 'flex-col items-center' : ''">
    <div :class="isMobile ? '' : 'mr-8'">
      <NSkeleton v-if="!user" circle size="medium" :height="64" :width="64" />
      <NAvatar v-else round :size="64" :src="DefaultAvatar" />
    </div>
    <div v-if="!user">
      <NSkeleton text :repeat="4" />
    </div>
    <div v-else class="grow">
      <div class="mb-8px flex items-center justify-between" :class="isMobile ? 'flex-col items-center mb-4' : ''">
        <div class="mb-2">
          <span class="text-lg">
            {{ user?.name }}
          </span>
          <span> @{{ user?.username }} </span>
        </div>
        <NSpace>
          <div v-if="user.socialAccount.codeforces">
            <Link :href="cfLink" :new-window="true">
              <NIcon :size="20">
                <CodeforcesIcon />
              </NIcon>
            </Link>
          </div>
          <div v-if="user.socialAccount.atCoder">
            <Link :href="atCoderLink" target="_blank">
              <NIcon :size="20">
                <AtCoderIcon />
              </NIcon>
            </Link>
          </div>
          <div v-if="user.socialAccount.luogu">
            <Link :href="luoguLink" target="_blank">
              <NIcon :size="20">
                <LuoguIcon />
              </NIcon>
            </Link>
          </div>
          <div v-if="user.socialAccount.nowcoder">
            <Link :href="nowcoderLink" target="_blank">
              <NIcon :size="20">
                <NowcoderIcon />
              </NIcon>
            </Link>
          </div>
          <div v-if="user.socialAccount.vjudge">
            <Link :href="vjudgeLink" target="_blank">
              <NIcon :size="20">
                <VJudgeIcon />
              </NIcon>
            </Link>
          </div>
        </NSpace>
      </div>
      <div class="flex justify-between" :class="isMobile ? 'flex-col items-center' : ''">
        <div :class="isMobile ? 'mb-2' : ''">
          <div v-if="user?.socialAccount?.codeforcesRating" class="text-4" :class="isMobile ? 'flex flex-col items-center' : ''">
            <span>Codeforces: <span class="text-[#f50]">{{ user.socialAccount?.codeforcesRating ?? 0 }}</span></span>
            <span v-if="user.socialAccount?.codeforcesRank">
              Rank: <span class="text-[#f50]"> {{ user.socialAccount?.codeforcesRank }} </span>
            </span>
          </div>
        </div>
        <div>
          <NButton v-if="userStore.username === username" size="small" @click="modalVisible = true">
            修改个人信息
          </NButton>
          <NModal v-model:show="modalVisible" title="修改个人信息" preset="card" style="width: 80%">
            <UserProfileUpdateForm :user="user" />
          </NModal>
        </div>
      </div>
    </div>
  </div>
</template>
