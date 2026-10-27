import { SlidersHorizontal, RotateCcw } from "lucide-react"
import { useFilter } from "../hooks/useFilter";

const categories = [
  { id: "all", label: "All Products" },
  { id: "men's clothing", label: "Men's Clothing" },
  { id: "women's clothing", label: "Women's Clothing" },
  { id: "jewelery", label: "Jewelery" },
  { id: "electronics", label: "Electronics" },
]

const ProductFilter = () => {
  const selectedCategory = useFilter((state) => state.selectedCategory)
  const setSelectedCategory = useFilter((state) => state.setSelectedCategory)
  const handleSelect = (category) => {
    setSelectedCategory(category)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 pt-4 sm:pt-8 pb-2 flex items-center justify-between border-b border-base-200">
      <div className="hidden md:flex items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`btn btn-sm rounded-full font-medium transition-all ${
              selectedCategory === cat.id
                ? "btn-neutral"
                : "btn-ghost bg-base-200/50 hover:bg-base-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <span className="md:hidden text-xs font-bold uppercase tracking-wider truncate">
        {categories.find((c) => c.id === selectedCategory)?.label}
      </span>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline btn-xs sm:btn-sm gap-1.5 border-base-300 hover:bg-neutral hover:text-neutral-content"
        >
          <SlidersHorizontal size={13} />
          <span className="text-xs">Filter</span>
          {selectedCategory !== "all" && (
            <span className="badge badge-xs badge-neutral scale-90">1</span>
          )}
        </div>

        <div
          tabIndex={0}
          className="dropdown-content bg-base-100 rounded-box z-30 mt-1.5 w-52 sm:w-64 p-2.5 sm:p-4 shadow-xl border border-base-200"
        >
          <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-base-200">
            <span className="text-[11px] font-bold uppercase tracking-widest text-base-content/60">
              Category
            </span>
            {selectedCategory !== "all" && (
              <button
                onClick={() => handleSelect("all")}
                className="btn btn-ghost btn-xs h-5 min-h-0 text-error gap-1 px-1 text-[11px]"
              >
                <RotateCcw size={11} />
                Reset
              </button>
            )}
          </div>

          <div className="form-control space-y-0.5">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="label cursor-pointer justify-start gap-2.5 py-1.5 px-2 rounded-md hover:bg-base-200/60 transition-colors"
              >
                <input
                  type="radio"
                  name="filter-radio"
                  className="radio radio-xs sm:radio-sm radio-neutral"
                  checked={selectedCategory === cat.id}
                  onChange={() => handleSelect(cat.id)}
                />
                <span className="label-text text-xs sm:text-sm font-medium">
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
