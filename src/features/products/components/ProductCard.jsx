import { ShoppingBag } from "lucide-react";

const ProductCard = ({ title, description, imgUrl, category, price }) => {
  return (
    <article className="border border-gray-300 card bg-base-100 border border-base-200 hover:border-base-300 hover:shadow-lg transition-all duration-300 group">
      <figure className="relative h-72 w-full bg-base-200/40 p-6 overflow-hidden">
        <img
          src={imgUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        <span className="badge badge-neutral badge-sm uppercase tracking-wider text-[10px] absolute top-3 left-3">
          {category}
        </span>
      </figure>

      <div className="card-body p-5 flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="card-title text-base font-bold line-clamp-1" title={title}>
            {title}
          </h2>
          <p className="text-xs text-base-content/60 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="card-actions items-center justify-between pt-4 mt-2 border-t border-base-200">
          <span className="text-lg font-black tracking-tight">
            {price}$
          </span>
          <button className="btn btn-neutral btn-sm gap-2">
            <ShoppingBag size={15} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;