import { ShoppingBag } from "lucide-react";

const ProductCard = ({ title, description, imgUrl, category, price }) => {
  return (
    <article className="card bg-base-100 border border-base-200 hover:border-base-300 hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <figure className="relative h-36 xs:h-44 sm:h-64 md:h-72 w-full bg-base-200/40 p-2.5 sm:p-6 overflow-hidden">
        <img
          src={imgUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        <span className="badge badge-neutral badge-xs sm:badge-sm uppercase tracking-wider text-[6px] sm:text-[10px] absolute top-2 left-2 sm:top-3 sm:left-3">
          {category}
        </span>
      </figure>

      <div className="card-body p-2.5 sm:p-5 flex flex-col justify-between">
        <div className="space-y-1 sm:space-y-2">
          <h2
            className="card-title text-xs sm:text-base font-bold line-clamp-1 leading-snug"
            title={title}
          >
            {title}
          </h2>
          <p className="text-[11px] sm:text-xs text-base-content/60 line-clamp-1 sm:line-clamp-2 leading-relaxed hidden xs:block">
            {description}
          </p>
        </div>

        <div className="card-actions items-center justify-between pt-2 sm:pt-4 mt-1 sm:mt-2 border-t border-base-200">
          <span className="text-xs sm:text-lg font-black tracking-tight">
            ${price}
          </span>
          <button className="btn btn-neutral btn-xs sm:btn-sm gap-1 sm:gap-2 px-2 sm:px-3">
            <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-[11px] sm:text-xs">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;