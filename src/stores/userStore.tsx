import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { clearToken, setToken } from '@/shared/token'
import { http } from '@/shared/Http'
import type { Models } from '@/models/models'

export interface UserState {
  userId?: number
  username?: string
  name?: string
  superAdmin?: boolean
  admin?: boolean
}

export interface LoginParams {
  username: string
  password: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: undefined,
    username: undefined,
    name: undefined,
    superAdmin: undefined,
    admin: undefined,
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },
  actions: {
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    resetInfo() {
      this.$reset()
    },
    logoutCallBack() {
      this.resetInfo()
      clearToken()
    },
    logout() {
      this.logoutCallBack()
    },
    async login(username: string, password: string) {
      await http
        .get<string>('/auth/login', { username, password })
        .then((res) => {
          const token = res.data.data
          setToken(token)
        })
        .catch((err: AxiosError) => {
          clearToken()
          throw err
        })
    },
    async current() {
      await http
        .get<Models.User>('/auth/current')
        .then((res) => {
          const data = res.data.data
          this.setInfo(data)
        })
        .catch((err) => {
          clearToken()
          throw err
        })
    },
  },
})
