import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_URL =
  import.meta.env.VITE_API_URL || "http://nfrxstore-api.vercel.app"

export const useAuth = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoggedIn: false,

      login: (newToken, userData = null) => {
        set({ token: newToken, user: userData, isLoggedIn: true })
        document.getElementById("auth_modal")?.close()
      },

      setUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : userData,
        }))
      },

      fetchMe: async () => {
        const { token } = get()
        if (!token) return null

        try {
          const response = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            if (response.status === 401) {
              set({ token: null, user: null, isLoggedIn: false })
            }
            return null
          }

          const data = await response.json()
          if (data?.user) {
            set({ user: data.user, isLoggedIn: true })
          }
          return data?.user || null
        } catch {
          return null
        }
      },

      logout: () => {
        set({ token: null, user: null, isLoggedIn: false })
      },

      openModal: () => {
        document.getElementById("auth_modal")?.showModal()
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
