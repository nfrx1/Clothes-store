import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import Cart from "../pages/Cart"

const CartLayout = () => {
  return (
    <section className="cart-layout min-h-screen w-full max-w-full overflow-x-hidden flex flex-col">
      <NavBar />
      <main className="flex-1 w-full bg-base-300">
        <Cart />
      </main>
      <Footer />
    </section>
  )
}

export default CartLayout
