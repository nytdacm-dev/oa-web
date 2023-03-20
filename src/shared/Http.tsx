import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosResponse,
} from 'axios'
import { getToken } from './token'
import router from '@/router'

export interface HttpResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }

export class Http {
  instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
  }

  get<R = unknown>(
    url: string,
    query?: Record<string, string | boolean | number | undefined>,
    config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>,
  ) {
    return this.instance.request<HttpResponse<R>>({ url, params: query, method: 'GET', ...config })
  }

  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue> | FormData,
    config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>,
  ) {
    return this.instance.request<HttpResponse<R>>({ url, data, method: 'POST', ...config })
  }

  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>,
  ) {
    return this.instance.request<HttpResponse<R>>({ url, data, method: 'PATCH', ...config })
  }

  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>,
  ) {
    return this.instance.request<HttpResponse<R>>({ url, params: query, method: 'DELETE', ...config })
  }
}

export const http = new Http('/api')
http.instance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    if (!config.headers)
      config.headers = {} as AxiosRequestHeaders

    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
http.instance.interceptors.response.use(
  (response: AxiosResponse<HttpResponse | Blob>) => {
    if (response.data instanceof Blob) {
      // download file
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', (response.headers['content-disposition']).split(';')[1].split('=')[1])
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
    return response
  },
  async (error: AxiosError) => {
    if (error.response) {
      if (error.response?.status === 404) {
        await router.push({ name: 'not-found' })
      }
      else if (error.response?.status === 429) {
        // TODO: 请求过于频繁
      }
    }
    throw error
  },
)
