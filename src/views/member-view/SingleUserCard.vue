<script setup lang="ts">
import { NAvatar } from "naive-ui";
import type { Models } from "@/models/models";
import DefaultAvatar from "@/assets/user-default-avatar.png";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{
  user: Models.User;
}>();
const goToUserProfile = () => {
  router.push(`/user/${props.user.username}`);
};
</script>

<template>
  <div class="wrapper" @click="goToUserProfile">
    <NAvatar class="avatar" round :size="80" :src="DefaultAvatar" />
    <div>
      <span class="name">
        {{ props.user.name }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;

  .avatar {
    margin: 5px;
  }

  .name {
    font-size: 20px;
  }
}
</style>
