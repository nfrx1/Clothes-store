import { useFilter } from "../hooks/useFilter"
import { useProducts } from "../hooks/useProducts"
import ProductCard from "./ProductCard"

const ProductsGrid = () => {
  const { results: items, loading, error } = useProducts()
  const selectedCategory = useFilter((state) => state.selectedCategory)
  const searchQuery = useFilter((state) => state.searchQuery)

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-8 lg:px-12 py-4 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2 sm:gap-3">
              <div className="skeleton bg-neutral-200 h-40 sm:h-72 w-full rounded-box"></div>
              <div className="skeleton bg-neutral-200 h-3 sm:h-4 w-16 sm:w-24"></div>
              <div className="skeleton bg-neutral-200 h-4 sm:h-5 w-full"></div>
              <div className="skeleton bg-neutral-200 h-3 sm:h-4 w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div role="alert" className="alert alert-error shadow-sm">
          <span>Failed to load products. Please try again later.</span>
        </div>
      </div>
    )
  }

  const filteredItems = items.filter((element) => {
    const matchesCategory =
      selectedCategory === "all" ||
      element.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesSearch = element.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 py-6 sm:py-10">
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-base-content/60 text-sm sm:text-base">
          No products found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {filteredItems.map((element) => (
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
      )}
    </section>
  )
}

export default ProductsGrid