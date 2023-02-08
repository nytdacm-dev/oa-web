import { getToken } from "@/shared/token";
import { useUserStore } from "@/stores/userStore";
import type { Router } from "vue-router";

const isLogin = () => {
  return !!getToken();
};

export const setupUserInfoGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.name === "login") {
      userStore.logout();
      next()
    } else if (isLogin()) {
      if (!userStore.userId) {
        // 状态库没有用户信息，请求用户信息
        userStore
          .current()
          .then(() => {
            next();
          })
          .catch(() => {
            next({ name: 'login' })
          })
      } else {
        next()
      }
    } else {
      next()
    }
  });
};
