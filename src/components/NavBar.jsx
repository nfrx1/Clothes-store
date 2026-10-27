import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react"
import { useEffect, useState } from "react"

const hookSentences = [
  "Get 20% OFF your first order — Code: WELCOME20",
  "Free express shipping on all orders over $20",
  "New Season Collection: Grab your favorites before they sell out",
]

const NavBar = () => {
  const [index, setIndex] = useState(0)

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
      <div className="bg-neutral text-neutral-content py-2 px-4 md:px-12 border-b border-neutral-content/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={prevSlide}
            aria-label="Previous offer"
            className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={16} />
          </button>

          <p className="text-[11px] sm:text-xs font-medium tracking-widest uppercase text-center truncate px-2 transition-all duration-300">
            {hookSentences[index]}
          </p>

          <button
            onClick={nextSlide}
            aria-label="Next offer"
            className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <nav className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-200 px-4 sm:px-8 lg:px-12 h-16 md:h-20 transition-all">
        <div className="navbar-start gap-1 sm:gap-2">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
            >
              <Menu size={20} strokeWidth={1.75} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
            >
              <li>
                <a className="font-medium">New Arrivals</a>
              </li>
              <li>
                <a className="font-medium">Men</a>
              </li>
              <li>
                <a className="font-medium">Women</a>
              </li>
              <li>
                <a className="font-medium text-error">Sale</a>
              </li>
            </ul>
          </div>

          <button className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-200/60">
            <User size={20} strokeWidth={1.75} />
          </button>

          <button className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-200/60">
            <div className="indicator">
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="badge badge-xs badge-primary indicator-item font-bold">
                3
              </span>
            </div>
          </button>
        </div>
        <div className="navbar-center flex flex-col items-center">
          <a
            href="/"
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.25em] uppercase cursor-pointer select-none"
          >
            LOGO
          </a>
        </div>

        <div className="navbar-end gap-1 sm:gap-3">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost btn-sm gap-1.5 font-normal text-xs sm:text-sm px-2 sm:px-3 hover:bg-base-200/60">
              <Globe size={16} strokeWidth={1.75} className=" opacity-75" />
              <span className="hidden sm:inline">English</span>
            </summary>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-32 p-1.5 shadow-xl border border-base-200 mt-2 text-xs sm:text-sm">
              <li>
                <a className="active font-medium">English</a>
              </li>
              <li>
                <a className="font-medium text-right">العربية</a>
              </li>
            </ul>
          </details>

          <button className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-200/60">
            <Search size={20} strokeWidth={1.75} />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
