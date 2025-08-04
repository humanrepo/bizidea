import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'
import { apiClient } from '@/lib/api'

export interface User {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  avatar_url?: string
  role: 'user' | 'premium' | 'admin'
  is_verified: boolean
  language: string
  country_code?: string
  ideas_generated: number
  premium_until?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  initializeAuth: () => void
  setLoading: (loading: boolean) => void
}

interface RegisterData {
  email: string
  password: string
  username: string
  first_name: string
  last_name: string
  language?: string
  country_code?: string
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true })
          
          const response = await apiClient.post('/auth/login', {
            email,
            password,
          })
          
          const { access_token, user } = response.data
          
          // Set token in API client
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
          
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          })
          
          toast.success(`Bienvenue ${user.first_name} !`)
          
        } catch (error: any) {
          set({ isLoading: false })
          const message = error.response?.data?.detail || 'Erreur de connexion'
          toast.error(message)
          throw error
        }
      },

      register: async (data: RegisterData) => {
        try {
          set({ isLoading: true })
          
          const response = await apiClient.post('/auth/register', data)
          
          const { access_token, user } = response.data
          
          // Set token in API client
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
          
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          })
          
          toast.success('Compte créé avec succès !')
          
        } catch (error: any) {
          set({ isLoading: false })
          const message = error.response?.data?.detail || 'Erreur lors de la création du compte'
          toast.error(message)
          throw error
        }
      },

      logout: () => {
        // Remove token from API client
        delete apiClient.defaults.headers.common['Authorization']
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
        
        toast.success('Déconnexion réussie')
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true })
          
          const response = await apiClient.put('/users/profile', data)
          const updatedUser = response.data
          
          set({
            user: updatedUser,
            isLoading: false,
          })
          
          toast.success('Profil mis à jour')
          
        } catch (error: any) {
          set({ isLoading: false })
          const message = error.response?.data?.detail || 'Erreur lors de la mise à jour'
          toast.error(message)
          throw error
        }
      },

      initializeAuth: () => {
        const { token } = get()
        
        if (token) {
          // Set token in API client
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Verify token validity
          apiClient.get('/auth/verify')
            .then(response => {
              set({
                user: response.data.user,
                isAuthenticated: true,
              })
            })
            .catch(() => {
              // Token is invalid, logout
              get().logout()
            })
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)