import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  get: (url: string, config?: AxiosRequestConfig) => instance.get(url, config).then((res) => res.data),
  post: (url: string, body: unknown, config?: AxiosRequestConfig) => instance.post(url, body, config).then((res) => res.data),
}
