import type { AuthRepository } from '../../domain/repositories/AuthRepository'
import type { Usuario } from '../../domain/types'
import { api } from '../api/client'

export class AuthRepositoryImpl implements AuthRepository {
  async login(email: string, password: string): Promise<{ accessToken: string; user: Usuario }> {
    const { data } = await api.post('/auth/login', { email, password })
    if (data.accessToken) localStorage.setItem('accessToken', data.accessToken)
    return data
  }

  async me(): Promise<Usuario> {
    const { data } = await api.get('/auth/me')
    return data
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('accessToken')
    }
  }

  async refresh(): Promise<{ accessToken: string }> {
    const { data } = await api.post('/auth/refresh')
    if (data.accessToken) localStorage.setItem('accessToken', data.accessToken)
    return data
  }
}

export const authRepository = new AuthRepositoryImpl()