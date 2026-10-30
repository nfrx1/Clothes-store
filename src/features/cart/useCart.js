import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useAuth } from "../auth/hooks/useAuth"

const API_URL =
  import.meta.env.VITE_API_URL || "https://nfrxstore-api.vercel.app"

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      cartId: 1,
      isCartOpen: false,
      loading: false,
      syncing: false,
      error: null,
      hasInitialized: false,
      promoCode: "",
      discountPercent: 0,
      orderSuccess: false,

      openCart: () =>
        set({ isCartOpen: true, orderSuccess: false, error: null }),
      closeCart: () =>
        set({ isCartOpen: false, orderSuccess: false, error: null }),
      toggleCart: () =>
        set((state) => ({
          isCartOpen: !state.isCartOpen,
          orderSuccess: false,
          error: null,
        })),

      fetchCart: async (userId) => {
        const { token, user } = useAuth.getState()
        const targetId = userId || user?.id || 1

        set({ loading: true, error: null })
        try {
          const headers = token ? { Authorization: `Bearer ${token}` } : {}
          const response = await fetch(`${API_URL}/api/carts/${targetId}`, {
            headers,
          })

          if (!response.ok) {
            throw new Error("Failed to fetch cart from server")
          }

          const cartData = await response.json()

          if (Array.isArray(cartData?.items)) {
            const currentItems = get().items
            const nextItems =
              cartData.items.length > 0 || !get().hasInitialized
                ? cartData.items
                : currentItems

            set({
              items: nextItems,
              cartId: cartData?.id || targetId,
              loading: false,
              hasInitialized: true,
              error: null,
            })
            return
          }

          const cartProducts = cartData?.products || []
          const detailedItems = await Promise.all(
            cartProducts.map(async (entry) => {
              const prodRes = await fetch(
                `${API_URL}/api/products/${entry.productId}`,
              )
              if (!prodRes.ok) {
                throw new Error(
                  `Failed to fetch product #${entry.productId} details`,
                )
              }
              const product = await prodRes.json()
              return {
                id: product.id,
                title: product.title,
                price: Number(product.price),
                description: product.description,
                category: product.category,
                image: product.image,
                quantity: entry.quantity || 1,
              }
            }),
          )

          set({
            items: detailedItems,
            cartId: cartData?.id || targetId,
            loading: false,
            hasInitialized: true,
            error: null,
          })
        } catch (err) {
          set({
            error: err.message || "Failed to load cart",
            loading: false,
            hasInitialized: true,
          })
        }
      },

      syncCartWithApi: async (updatedItems, method = "PUT") => {
        const { token, user } = useAuth.getState()
        if (!token) return

        const { cartId } = get()
        set({ syncing: true })
        try {
          const endpoint =
            method === "POST"
              ? `${API_URL}/api/carts`
              : `${API_URL}/api/carts/${cartId || user?.id || 1}`

          const response = await fetch(endpoint, {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: user?.id || 1,
              date: new Date().toISOString().split("T")[0],
              products: updatedItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
              })),
            }),
          })

          if (!response.ok) {
            throw new Error("Failed to sync cart with server")
          }

          const data = await response.json()
          if (data?.id) {
            set({ cartId: data.id })
          }
        } catch (err) {
          console.error("Cart sync error:", err)
        } finally {
          set({ syncing: false })
        }
      },

      addToCart: async (product, quantity = 1) => {
        const { items, syncCartWithApi } = get()
        const existingIndex = items.findIndex((item) => item.id === product.id)

        let updatedItems
        if (existingIndex > -1) {
          updatedItems = items.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        } else {
          updatedItems = [
            ...items,
            {
              id: product.id,
              title: product.title,
              price: Number(product.price),
              description: product.description || "",
              category: product.category || "",
              image: product.image || product.imgUrl,
              quantity,
            },
          ]
        }

        set({ items: updatedItems, orderSuccess: false, error: null })
        await syncCartWithApi(updatedItems, items.length === 0 ? "POST" : "PUT")
      },

      removeFromCart: async (productId) => {
        const { items, syncCartWithApi } = get()
        const updatedItems = items.filter((item) => item.id !== productId)
        set({ items: updatedItems, error: null })
        await syncCartWithApi(updatedItems, "PUT")
      },

      updateQuantity: async (productId, quantity) => {
        const { items, removeFromCart, syncCartWithApi } = get()
        if (quantity <= 0) {
          await removeFromCart(productId)
          return
        }

        const updatedItems = items.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        )
        set({ items: updatedItems, error: null })
        await syncCartWithApi(updatedItems, "PUT")
      },

      increaseQuantity: async (productId) => {
        const item = get().items.find((i) => i.id === productId)
        if (item) {
          await get().updateQuantity(productId, item.quantity + 1)
        }
      },

      decreaseQuantity: async (productId) => {
        const item = get().items.find((i) => i.id === productId)
        if (item) {
          await get().updateQuantity(productId, item.quantity - 1)
        }
      },

      clearCart: async () => {
        const { cartId } = get()
        const { token, user } = useAuth.getState()

        set({
          items: [],
          promoCode: "",
          discountPercent: 0,
          error: null,
          syncing: Boolean(token),
        })

        if (!token) return

        try {
          await fetch(`${API_URL}/api/carts/${cartId || user?.id || 1}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        } catch (err) {
          console.error("Failed to delete cart on server:", err)
        } finally {
          set({ syncing: false })
        }
      },

      applyPromoCode: (code) => {
        const normalized = code.trim().toUpperCase()
        if (normalized === "WELCOME20") {
          set({ promoCode: "WELCOME20", discountPercent: 20 })
          return { success: true, message: "20% discount applied (WELCOME20)" }
        }
        return { success: false, message: "Invalid promo code. Try WELCOME20" }
      },

      removePromoCode: () => {
        set({ promoCode: "", discountPercent: 0 })
      },

      checkout: async () => {
        const { items, promoCode } = get()
        if (items.length === 0) return false

        const { token, isLoggedIn, openModal, logout, setUser } =
          useAuth.getState()

        if (!isLoggedIn || !token) {
          set({ error: "Please log in to place an order." })
          openModal()
          return false
        }

        set({ syncing: true, error: null, orderSuccess: false })
        try {
          const response = await fetch(`${API_URL}/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              products: items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
              })),
              promoCode: promoCode || null,
            }),
          })

          const data = await response.json().catch(() => ({}))

          if (!response.ok) {
            if (response.status === 401) {
              logout()
              openModal()
              throw new Error("Please log in to place an order.")
            }

            if (
              response.status === 403 ||
              data.error === "OrderLimitExceeded"
            ) {
              setUser({ ordersCount: 2, remainingOrders: 0 })
              throw new Error(
                "Order limit reached: You cannot place more than 2 orders per account.",
              )
            }

            throw new Error(
              data.message || "Checkout failed. Please try again.",
            )
          }

          if (typeof data.ordersCount === "number") {
            setUser({
              ordersCount: data.ordersCount,
              remainingOrders: data.remainingOrders,
            })
          }

          set({
            items: [],
            promoCode: "",
            discountPercent: 0,
            orderSuccess: true,
            syncing: false,
            error: null,
          })
          return true
        } catch (err) {
          set({
            error: err.message || "Checkout failed",
            syncing: false,
          })
          return false
        }
      },

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + Number(item.price) * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        hasInitialized: state.hasInitialized,
        promoCode: state.promoCode,
        discountPercent: state.discountPercent,
      }),
    },
  ),
)

export default useCart
