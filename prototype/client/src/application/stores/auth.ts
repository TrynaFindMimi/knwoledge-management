import { create } from 'zustand'
import type { Usuario } from '../../domain/types'

/**
 * CAPA APLICACIÓN — estado de autenticación (solo datos, sin I/O).
 * El efecto de red (logout remoto) lo orquesta presentation via services.auth.
 */
interface AuthState {
  user: Usuario | null
  setUser: (u: Usuario | null) => void
  clear: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clear: () => {
    localStorage.removeItem('accessToken')
    set({ user: null })
  },
}))
