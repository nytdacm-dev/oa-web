import { createLocalStorage } from '@/shared/utils'

const LOCALSTORAGE_NAME = 'token'
interface Token {
  token: string
}
const store = createLocalStorage<Token>(LOCALSTORAGE_NAME)

export const getToken = () => {
  return store.get()?.token
}

export const setToken = (token: string) => {
  store.set({ ...store.get(), token })
}

export const clearToken = () => {
  store.remove()
}
