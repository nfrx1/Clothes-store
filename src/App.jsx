import { useEffect } from "react"
import AuthModal from "./features/auth/components/AuthModal"
import { useCart } from "./features/cart/useCart"
import CartLayout from "./layouts/CartLayout"
import MainLayout from "./layouts/MainLayout"

function App() {
  const isCartOpen = useCart((state) => state.isCartOpen)
  const hasInitialized = useCart((state) => state.hasInitialized)
  const fetchCart = useCart((state) => state.fetchCart)

  useEffect(() => {
    if (!hasInitialized) {
      fetchCart(1)
    }
  }, [hasInitialized, fetchCart])

  return (
    <>
      {isCartOpen ? <CartLayout /> : <MainLayout />}
      <AuthModal />
    </>
  )
}

export default App