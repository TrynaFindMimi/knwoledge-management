
import type { AuthRepository } from '../../domain/repositories/AuthRepository'

export function createAuthService(repo: AuthRepository) {
  return {
    login: (email: string, password: string) => repo.login(email, password),
    me: () => repo.me(),
    logout: () => repo.logout(),
    refresh: () => repo.refresh(),
  }
}

export type AuthService = ReturnType<typeof createAuthService>