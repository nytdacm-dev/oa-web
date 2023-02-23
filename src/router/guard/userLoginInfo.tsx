import type { Router } from 'vue-router'
import type { AxiosError } from 'axios'
import { getToken } from '@/shared/token'
import { useUserStore } from '@/stores/userStore'

const isLogin = () => {
  return !!getToken()
}

export const setupUserInfoGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (to.name === 'login') {
      userStore.logout()
      next()
    }
    else if (isLogin()) {
      if (!userStore.userId) {
        // 状态库没有用户信息，请求用户信息
        userStore
          .current()
          .then(() => {
            next()
          })
          .catch((e: AxiosError) => {
            if (e.response?.status === 500)
              next('/500')
            else
              next({ name: 'login' })
          })
      }
      else {
        next()
      }
    }
    else {
      next()
    }
  })
}
