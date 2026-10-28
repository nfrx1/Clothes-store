import { ArrowRight, ShieldCheck, Tag, Truck, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useCart } from "../useCart"

const FREE_SHIPPING_THRESHOLD = 20
const SHIPPING_FEE = 4.99

const CartSummary = () => {
  const items = useCart((state) => state.items)
  const promoCode = useCart((state) => state.promoCode)
  const discountPercent = useCart((state) => state.discountPercent)
  const applyPromoCode = useCart((state) => state.applyPromoCode)
  const removePromoCode = useCart((state) => state.removePromoCode)
  const checkout = useCart((state) => state.checkout)
  const syncing = useCart((state) => state.syncing)

  const isLoggedIn = useAuth((state) => state.isLoggedIn)
  const openModal = useAuth((state) => state.openModal)

  const [codeInput, setCodeInput] = useState("")
  const [promoFeedback, setPromoFeedback] = useState(null)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  )

  const discountAmount = (subtotal * discountPercent) / 100
  const discountedSubtotal = Math.max(0, subtotal - discountAmount)
  const isFreeShipping =
    discountedSubtotal >= FREE_SHIPPING_THRESHOLD || discountedSubtotal === 0
  const shippingCost = isFreeShipping ? 0 : SHIPPING_FEE
  const total = discountedSubtotal + shippingCost
  const amountToFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - discountedSubtotal
  )

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (!codeInput.trim()) return
    const result = applyPromoCode(codeInput)
    setPromoFeedback(result)
    if (result.success) {
      setCodeInput("")
    }
  }

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      openModal()
      return
    }
    await checkout()
  }

  return (
    <aside className="card bg-base-100 border border-base-200 p-4 sm:p-6 space-y-5 sticky top-24">
      <div className="flex items-center justify-between border-b border-base-200 pb-3.5">
        <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
          Order Summary
        </h2>
        <span className="badge badge-neutral badge-sm font-bold">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Free Shipping Progress */}
      <div className="bg-base-200/50 rounded-xl p-3 space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium">
          <Truck size={15} className="shrink-0" />
          {isFreeShipping ? (
            <span className="font-semibold">
              You unlocked <span className="underline">Free Express Shipping</span>!
            </span>
          ) : (
            <span>
              Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more for{" "}
              <strong>Free Express Shipping</strong>
            </span>
          )}
        </div>
        <progress
          className="progress progress-neutral w-full h-1.5"
          value={Math.min(discountedSubtotal, FREE_SHIPPING_THRESHOLD)}
          max={FREE_SHIPPING_THRESHOLD}
        />
      </div>

      {/* Promo Code Input */}
      <div className="space-y-2">
        {promoCode ? (
          <div className="flex items-center justify-between bg-neutral/5 border border-base-300 rounded-lg px-3 py-2 text-xs">
            <div className="flex items-center gap-2 font-bold">
              <Tag size={14} />
              <span>{promoCode} (-{discountPercent}%)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                removePromoCode()
                setPromoFeedback(null)
              }}
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Remove promo code"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <label className="input input-sm input-bordered flex items-center gap-2 flex-1 focus-within:outline-none focus-within:border-neutral">
              <Tag size={14} className="text-base-content/50 shrink-0" />
              <input
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Promo code (WELCOME20)"
                className="grow text-xs uppercase"
              />
            </label>
            <button
              type="submit"
              className="btn btn-outline btn-sm border-base-300 hover:bg-neutral hover:text-neutral-content"
            >
              Apply
            </button>
          </form>
        )}

        {promoFeedback && !promoCode && (
          <p
            className={`text-[11px] ${
              promoFeedback.success ? "text-success" : "text-error"
            }`}
          >
            {promoFeedback.message}
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2.5 text-xs sm:text-sm border-t border-base-200 pt-4">
        <div className="flex justify-between text-base-content/70">
          <span>Subtotal</span>
          <span className="font-semibold text-base-content">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="flex justify-between text-success font-medium">
            <span>Discount ({discountPercent}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-base-content/70">
          <span>Express Shipping</span>
          <span className="font-semibold text-base-content">
            {isFreeShipping ? "FREE" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>

        <div className="divider my-1"></div>

        <div className="flex justify-between items-baseline pt-1">
          <span className="text-sm sm:text-base font-black uppercase tracking-tight">
            Total
          </span>
          <span className="text-lg sm:text-2xl font-black tracking-tight">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout CTA */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={syncing || items.length === 0}
        className="btn btn-neutral w-full gap-2 text-xs sm:text-sm uppercase tracking-wider font-bold"
      >
        {syncing ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <>
            <span>{isLoggedIn ? "Checkout Now" : "Log In to Checkout"}</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-base-content/50 pt-1">
        <ShieldCheck size={14} className="shrink-0" />
        <span>Secure checkout powered by FakeStoreAPI</span>
      </div>
    </aside>
  )
}

export default CartSummary
