
import { authRepository } from '../repositories/AuthRepositoryImpl'

export const AuthApi = {
  login: (email: string, password: string) => authRepository.login(email, password),
  me: () => authRepository.me(),
  logout: () => authRepository.logout(),
}