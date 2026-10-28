import { create } from "zustand"
import { persist } from "zustand/middleware"

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

      openCart: () => set({ isCartOpen: true, orderSuccess: false }),
      closeCart: () => set({ isCartOpen: false, orderSuccess: false }),
      toggleCart: () =>
        set((state) => ({ isCartOpen: !state.isCartOpen, orderSuccess: false })),

      fetchCart: async (userId = 1) => {
        set({ loading: true, error: null })
        try {
          const response = await fetch(
            `https://fakestoreapi.com/carts/${userId}`
          )
          if (!response.ok) {
            throw new Error("Failed to fetch cart from FakeStoreAPI")
          }

          const cartData = await response.json()
          const cartProducts = cartData?.products || []

          const detailedItems = await Promise.all(
            cartProducts.map(async (entry) => {
              const prodRes = await fetch(
                `https://fakestoreapi.com/products/${entry.productId}`
              )
              if (!prodRes.ok) {
                throw new Error(
                  `Failed to fetch product #${entry.productId} details`
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
            })
          )

          set({
            items: detailedItems,
            cartId: cartData?.id || userId,
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
        const { cartId } = get()
        set({ syncing: true })
        try {
          const endpoint =
            method === "POST"
              ? "https://fakestoreapi.com/carts"
              : `https://fakestoreapi.com/carts/${cartId || 1}`

          const response = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: 1,
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
              : item
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

        set({ items: updatedItems, orderSuccess: false })
        await syncCartWithApi(updatedItems, items.length === 0 ? "POST" : "PUT")
      },

      removeFromCart: async (productId) => {
        const { items, syncCartWithApi } = get()
        const updatedItems = items.filter((item) => item.id !== productId)
        set({ items: updatedItems })
        await syncCartWithApi(updatedItems, "PUT")
      },

      updateQuantity: async (productId, quantity) => {
        const { items, removeFromCart, syncCartWithApi } = get()
        if (quantity <= 0) {
          await removeFromCart(productId)
          return
        }

        const updatedItems = items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
        set({ items: updatedItems })
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
        set({
          items: [],
          promoCode: "",
          discountPercent: 0,
          syncing: true,
        })
        try {
          await fetch(`https://fakestoreapi.com/carts/${cartId || 1}`, {
            method: "DELETE",
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
        const { items } = get()
        if (items.length === 0) return false

        set({ syncing: true, error: null })
        try {
          const response = await fetch("https://fakestoreapi.com/carts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: 1,
              date: new Date().toISOString().split("T")[0],
              products: items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
              })),
            }),
          })

          if (!response.ok) {
            throw new Error("Checkout failed. Please try again.")
          }

          set({
            items: [],
            promoCode: "",
            discountPercent: 0,
            orderSuccess: true,
            syncing: false,
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
          0
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
    }
  )
)

export default useCart
