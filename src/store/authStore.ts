import { create } from 'zustand'
import type { User } from '../types/dto'
import type { LoginResponse } from '../types/api'

interface AuthState {
  user: User | null
  setUser: (res: LoginResponse) => void
  logout: VoidFunction
}

// Using persist middleware to automatically save and retrieve auth state from localStorage.
export const useAuthStore = create<AuthState>()((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (res) => {
    set({ user: res.user })
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('user', JSON.stringify(res.user))
  },
  logout: () => {
    set({ user: null })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },
}))

export const useIsAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken')
  return !!accessToken
}
