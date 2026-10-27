import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  const { results: items, loading, error } = useProducts();

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px sm:px-4 lg:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="skeleton bg-neutral-200 h-80 w-full rounded-box"></div>
              <div className="skeleton bg-neutral-200 h-4 w-24"></div>
              <div className="skeleton bg-neutral-200 h-5 w-full"></div>
              <div className="skeleton bg-neutral-200 h-4 w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div role="alert" className="alert alert-error shadow-sm">
          <span>Failed to load products. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4">
        {items.map((element) => (
          <ProductCard
            key={element.id}
            title={element.title}
            description={element.description}
            imgUrl={element.image}
            category={element.category}
            price={element.price}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsGrid;