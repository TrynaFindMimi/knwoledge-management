import axios, { type InternalAxiosRequestConfig } from 'axios'
import { env } from '../config/env'

// ── Cliente HTTP centralizado (único punto de salida a red) ──
export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 15000,
})

// Request: inyecta token desde localStorage (fuente única)
api.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken')
  if (token && cfg.headers) {
    cfg.headers.Authorization = `Bearer ${token}`
  }
  return cfg
})

// Response: refresh con cola para evitar N llamadas paralelas y loop infinito
let isRefreshing = false
let failedQueue: Array<{
  resolve: (v: unknown) => void
  reject: (e: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Solo 401 y no reintentado previamente, y no es el propio /auth/refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          if (token && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await api.post('/auth/refresh')
        const newToken: string = data.accessToken
        localStorage.setItem('accessToken', newToken)
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`
        processQueue(null, newToken)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.removeItem('accessToken')
        // Redirige a login solo en browser (no durante SSR/tests)
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)
