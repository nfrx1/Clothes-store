import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../useCart"

const CartItem = ({ item }) => {
  const increaseQuantity = useCart((state) => state.increaseQuantity)
  const decreaseQuantity = useCart((state) => state.decreaseQuantity)
  const removeFromCart = useCart((state) => state.removeFromCart)
  const syncing = useCart((state) => state.syncing)

  const itemTotal = (Number(item.price) * item.quantity).toFixed(2)

  return (
    <article className="card bg-base-100 border border-base-200 hover:border-base-300 transition-all duration-200 p-3 sm:p-5">
      <div className="flex gap-3 sm:gap-5 items-center">
        <figure className="relative h-20 w-20 sm:h-28 sm:w-28 shrink-0 bg-base-200/40 rounded-box p-2 sm:p-3 overflow-hidden flex items-center justify-center">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-contain mix-blend-multiply"
          />
        </figure>

        <div className="flex-1 min-w-0 flex flex-col justify-between gap-2 sm:gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 min-w-0">
              {item.category && (
                <span className="badge badge-neutral badge-xs uppercase tracking-wider text-[9px] px-1.5">
                  {item.category}
                </span>
              )}
              <h3
                className="font-bold text-xs sm:text-base line-clamp-1 sm:line-clamp-2 leading-snug"
                title={item.title}
              >
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-base-content/60 font-medium">
                Unit Price: ${Number(item.price).toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              disabled={syncing}
              aria-label={`Remove ${item.title}`}
              className="btn btn-ghost btn-xs sm:btn-sm btn-circle text-base-content/50 hover:text-error hover:bg-error/10 shrink-0"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-base-200">
            <div className="join border border-base-300 rounded-lg bg-base-200/30">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                disabled={syncing}
                aria-label="Decrease quantity"
                className="btn btn-ghost btn-xs sm:btn-sm join-item px-2 sm:px-2.5"
              >
                <Minus size={13} />
              </button>
              <span className="join-item px-2.5 sm:px-3.5 flex items-center justify-center text-xs sm:text-sm font-bold select-none">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => increaseQuantity(item.id)}
                disabled={syncing}
                aria-label="Increase quantity"
                className="btn btn-ghost btn-xs sm:btn-sm join-item px-2 sm:px-2.5"
              >
                <Plus size={13} />
              </button>
            </div>

            <div className="text-right">
              <span className="text-sm sm:text-lg font-black tracking-tight">
                ${itemTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CartItem
