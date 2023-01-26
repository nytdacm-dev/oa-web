import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError, type AxiosRequestHeaders } from "axios";
import { getToken } from "./token";

export type HttpResponse<T = unknown> = {
  code: number;
  message: string;
  data: T;
};

type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }

  get<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "url" | "params" | "method">
  ) {
    return this.instance.request<HttpResponse<R>>({ url, params: query, method: "GET", ...config });
  }

  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<HttpResponse<R>>({ url, data, method: "POST", ...config });
  }

  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<HttpResponse<R>>({ url, data, method: "PATCH", ...config });
  }

  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "url" | "params" | "method">
  ) {
    return this.instance.request<HttpResponse<R>>({ url, params: query, method: "DELETE", ...config });
  }
}

export const http = new Http("/api");
http.instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (!config.headers) { config.headers = {} as AxiosRequestHeaders; }
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
http.instance.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        // TODO: 请求过于频繁
      }
    }
    throw error;
  }
);
