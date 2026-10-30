import { ArrowLeft, RefreshCw, ShoppingBag } from "lucide-react"
import { useCart } from "../useCart"

const CartEmpty = () => {
  const closeCart = useCart((state) => state.closeCart)
  const fetchCart = useCart((state) => state.fetchCart)
  const loading = useCart((state) => state.loading)

  return (
    <div className="card bg-base-100 border border-base-200 max-w-lg mx-auto my-8 sm:my-14 p-8 sm:p-12 text-center items-center space-y-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-base-200 flex items-center justify-center text-base-content/50">
        <ShoppingBag size={32} strokeWidth={1.5} />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-base-content/60 max-w-xs mx-auto leading-relaxed">
          Looks like you haven&apos;t added any items to your bag yet. Explore our
          collection to find your next favorite piece.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full pt-2">
        <button
          type="button"
          onClick={closeCart}
          className="btn btn-neutral btn-sm sm:btn-md gap-2 w-full sm:w-auto"
        >
          <ArrowLeft size={16} />
          <span>Continue Shopping</span>
        </button>

        <button
          type="button"
          onClick={() => fetchCart()}
          disabled={loading}
          className="btn btn-outline btn-sm sm:btn-md border-base-300 gap-2 w-full sm:w-auto"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          <span>Sync Saved Bag</span>
        </button>
      </div>
    </div>
  )
}

export default CartEmpty
