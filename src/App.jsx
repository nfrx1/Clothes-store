import { useEffect } from "react"
import AuthModal from "./features/auth/components/AuthModal"
import { useAuth } from "./features/auth/hooks/useAuth"
import { useCart } from "./features/cart/useCart"
import CartLayout from "./layouts/CartLayout"
import MainLayout from "./layouts/MainLayout"

function App() {
  const isCartOpen = useCart((state) => state.isCartOpen)
  const hasInitialized = useCart((state) => state.hasInitialized)
  const fetchCart = useCart((state) => state.fetchCart)
  const isLoggedIn = useAuth((state) => state.isLoggedIn)
  const fetchMe = useAuth((state) => state.fetchMe)

  useEffect(() => {
    if (!hasInitialized) {
      fetchCart()
    }
  }, [hasInitialized, fetchCart])

  useEffect(() => {
    if (isLoggedIn) {
      fetchMe()
    }
  }, [isLoggedIn, fetchMe])

  return (
    <>
      {isCartOpen ? <CartLayout /> : <MainLayout />}
      <AuthModal />
    </>
  )
}

export default App
