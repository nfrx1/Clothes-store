import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useFilter } from "../features/products/hooks/useFilter"

const hookSentences = [
  "Get 20% OFF your first order – Code: WELCOME20",
  "Free express shipping on all orders over $20",
  "New Season Collection: Grab your favorites before they sell out",
]

const NavBar = () => {
  const [index, setIndex] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const setSearchQuery = useFilter((state) => state.setSearchQuery)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((state) => (state < hookSentences.length - 1 ? state + 1 : 0))
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => {
    setIndex((state) => (state > 0 ? state - 1 : hookSentences.length - 1))
  }

  const nextSlide = () => {
    setIndex((state) => (state < hookSentences.length - 1 ? state + 1 : 0))
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-neutral text-neutral-content py-1.5 sm:py-2 px-2 sm:px-4 md:px-12 border-b border-neutral-content/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1 min-w-0">
          <button
            onClick={prevSlide}
            aria-label="Previous offer"
            className="btn btn-ghost btn-xs btn-circle shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={16} />
          </button>

          <p className="flex-1 min-w-0 text-[10px] sm:text-xs font-medium tracking-wider sm:tracking-widest uppercase text-center truncate px-1 sm:px-2 transition-all duration-300">
            {hookSentences[index]}
          </p>

          <button
            onClick={nextSlide}
            aria-label="Next offer"
            className="btn btn-ghost btn-xs btn-circle shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <nav className="relative navbar bg-base-100/95 backdrop-blur-md border-b border-base-200 px-3 sm:px-8 lg:px-12 min-h-14 sm:min-h-16 md:min-h-20 w-full justify-between">
        {isSearchOpen ? (
          <div className="w-full max-w-4xl mx-auto flex items-center gap-2 sm:gap-4 px-1">
            <div className="relative flex-1 flex items-center">
              <Search
                size={18}
                strokeWidth={1.75}
                className="absolute left-3.5 text-base-content/50 pointer-events-none"
              />
              <input
                type="text"
                autoFocus
                onKeyDown={(e) => e.key === "Escape" && setIsSearchOpen(false)}
                placeholder="Search products, categories..."
                className="input input-sm sm:input-md w-full pl-10 pr-4 bg-base-200/60 border-transparent focus:border-neutral focus:bg-base-100 rounded-full text-xs sm:text-sm transition-all"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery(!isSearchOpen ? setSearchQuery("") : "")
              }}
              aria-label="Close search"
              className="btn btn-ghost btn-sm sm:btn-md btn-circle shrink-0 hover:bg-base-200"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>
        ) : (
          <>
            <div className="navbar-start w-auto flex-1 min-w-0 flex items-center gap-0.5 sm:gap-2">
              <button
                aria-label="User account"
                className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-200/60"
              >
                <User
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                  strokeWidth={1.75}
                />
              </button>

              <button
                aria-label="Shopping bag"
                className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-200/60"
              >
                <div className="indicator">
                  <ShoppingBag
                    className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                    strokeWidth={1.75}
                  />
                  <span className="badge badge-xs badge-primary indicator-item font-bold text-[10px] px-1">
                    3
                  </span>
                </div>
              </button>
            </div>

            <div className="navbar-center shrink-0 flex flex-col items-center px-2">
              <a
                href="/"
                className="text-lg sm:text-2xl md:text-3xl font-black tracking-[0.15em] sm:tracking-[0.25em] mr-[-0.15em] sm:mr-[-0.25em] uppercase cursor-pointer select-none"
              >
                NFRX
              </a>
            </div>

            <div className="navbar-end w-auto flex-1 min-w-0 flex items-center justify-end gap-0.5 sm:gap-3">
              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost btn-sm btn-circle sm:w-auto sm:px-3 gap-1.5 font-normal text-xs sm:text-sm hover:bg-base-200/60">
                  <Globe
                    size={16}
                    strokeWidth={1.75}
                    className="opacity-75 shrink-0"
                  />
                  <span className="hidden sm:inline">English</span>
                </summary>
                <ul className="dropdown-content menu bg-base-100 rounded-box z-50 w-32 p-1.5 shadow-xl border border-base-200 mt-2 text-xs sm:text-sm">
                  <li>
                    <a className="active font-medium">English</a>
                  </li>
                  <li>
                    <a className="font-medium text-right">العربية</a>
                  </li>
                </ul>
              </details>

              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-200/60"
              >
                <Search
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                  strokeWidth={1.75}
                />
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default NavBar
