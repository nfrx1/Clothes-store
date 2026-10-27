import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useAuth = create(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,

      login: (newToken) => {
        set({ token: newToken, isLoggedIn: true })
        document.getElementById("auth_modal")?.close()
      },

      logout: () => {
        set({ token: null, isLoggedIn: false })
      },

      openModal: () => {
        document.getElementById("auth_modal")?.showModal()
      },
    }),
    {
      name: "auth-storage",
    }
  )
)