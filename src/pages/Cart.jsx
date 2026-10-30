import {
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  ShoppingBag,
  Trash2,
} from "lucide-react"
import { useEffect } from "react"
import CartEmpty from "../features/cart/components/CartEmpty"
import CartItem from "../features/cart/components/CartItem"
import CartSummary from "../features/cart/components/CartSummary"
import { useCart } from "../features/cart/useCart"

const Cart = () => {
  const items = useCart((state) => state.items)
  const loading = useCart((state) => state.loading)
  const syncing = useCart((state) => state.syncing)
  const error = useCart((state) => state.error)
  const hasInitialized = useCart((state) => state.hasInitialized)
  const orderSuccess = useCart((state) => state.orderSuccess)
  const fetchCart = useCart((state) => state.fetchCart)
  const clearCart = useCart((state) => state.clearCart)
  const closeCart = useCart((state) => state.closeCart)

  useEffect(() => {
    if (!hasInitialized) {
      fetchCart()
    }
  }, [hasInitialized, fetchCart])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 py-6 sm:py-10 w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 mb-6 border-b border-base-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={closeCart}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
            aria-label="Back to store"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="shrink-0" />
              <h1 className="text-lg sm:text-2xl font-black uppercase tracking-tight">
                Shopping Bag
              </h1>
              <span className="badge badge-neutral badge-sm font-bold">
                {totalItems}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-base-content/60 mt-0.5">
              Synced with NFRX Store Service
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fetchCart()}
            disabled={loading || syncing}
            className="btn btn-outline btn-xs sm:btn-sm border-base-300 gap-1.5"
            title="Reload cart from server"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span className="text-xs">Sync Bag</span>
          </button>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              disabled={loading || syncing}
              className="btn btn-ghost btn-xs sm:btn-sm text-error hover:bg-error/10 gap-1.5"
            >
              <Trash2 size={14} />
              <span className="text-xs">Clear Bag</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div role="alert" className="alert alert-error shadow-sm mb-6 text-xs sm:text-sm">
          <span>{error}</span>
        </div>
      )}

      {orderSuccess && (
        <div
          role="alert"
          className="alert alert-success shadow-sm mb-6 flex items-center justify-between text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={20} className="shrink-0" />
            <div>
              <h3 className="font-bold">Order Placed Successfully!</h3>
              <p className="text-xs opacity-90">
                Your order was submitted to NFRX Store. Thank you for shopping with us.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="btn btn-sm btn-neutral"
          >
            Back to Store
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="card bg-base-100 border border-base-200 p-4 flex flex-row gap-4 items-center"
              >
                <div className="skeleton bg-neutral-200 h-24 w-24 rounded-box shrink-0"></div>
                <div className="flex-1 space-y-2.5">
                  <div className="skeleton bg-neutral-200 h-3 w-20"></div>
                  <div className="skeleton bg-neutral-200 h-4 w-3/4"></div>
                  <div className="skeleton bg-neutral-200 h-4 w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="card bg-base-100 border border-base-200 p-6 space-y-4">
              <div className="skeleton bg-neutral-200 h-6 w-1/2"></div>
              <div className="skeleton bg-neutral-200 h-12 w-full"></div>
              <div className="skeleton bg-neutral-200 h-24 w-full"></div>
              <div className="skeleton bg-neutral-200 h-10 w-full"></div>
            </div>
          </div>
        </div>
      ) : items.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-4">
            <CartSummary />
          </div>
        </div>
      )}
    </section>
  )
}

export default Cart
