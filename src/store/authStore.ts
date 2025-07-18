import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  username: string
}

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

// Using persist middleware to automatically save and retrieve auth state from localStorage.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage item
    }
  )
)

/**
 * A custom hook selector to easily check if the user is authenticated.
 * This prevents unnecessary re-renders in components that only need the auth status.
 */
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user)
