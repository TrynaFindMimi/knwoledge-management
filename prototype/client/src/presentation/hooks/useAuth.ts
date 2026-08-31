import { useAuth as useAuthStore } from '../../application/stores/auth'
import { services } from '../../composition/container'

export function useAuth() {
  const { user, setUser, clear } = useAuthStore()

  const login = async (email: string, password: string) => {
    const data = await services.auth.login(email, password)
    setUser(data.user)
    return data
  }

  const logout = async () => {
    try {
      await services.auth.logout()
    } finally {
      clear()
    }
  }

  return { user, setUser, login, logout }
}
