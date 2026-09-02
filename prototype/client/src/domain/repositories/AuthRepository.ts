import type { Usuario } from '../types'

export interface AuthRepository {
  login(email: string, password: string): Promise<{ accessToken: string; user: Usuario }>
  me(): Promise<Usuario>
  logout(): Promise<void>
  refresh(): Promise<{ accessToken: string }>
}