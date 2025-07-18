import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include JWT token as bearer token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const api = {
  get: (url: string, config?: AxiosRequestConfig) => instance.get(url, config).then((res) => res.data),
  post: (url: string, body: unknown, config?: AxiosRequestConfig) => instance.post(url, body, config).then((res) => res.data),
}
