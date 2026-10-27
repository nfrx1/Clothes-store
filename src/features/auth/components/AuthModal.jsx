import { Lock, Mail, User, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const AuthModal = () => {
  const login = useAuth((state) => state.login)
  const [isLoginView, setIsLoginView] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const resetForm = () => {
    setUsername("")
    setEmail("")
    setPassword("")
    setError("")
  }

  const toggleView = () => {
    setIsLoginView((prev) => !prev)
    resetForm()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isLoginView) {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
          }),
        })

        if (!response.ok) {
          throw new Error("Invalid username or password")
        }

        const data = await response.json()
        if (data.token) {
          login(data.token)
          resetForm()
        }
      } else {
        const response = await fetch("https://fakestoreapi.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: 0,
            username,
            email,
            password,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create account")
        }

        const data = await response.json()
        if (data.id) {
          login(`user-token-${data.id}`)
          resetForm()
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <dialog id="auth_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-100 p-6 sm:p-8 max-w-md w-full border border-base-200 shadow-2xl">
        <form method="dialog">
          <button
            onClick={resetForm}
            aria-label="Close modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          >
            <X size={18} />
          </button>
        </form>

        <div className="text-center space-y-1.5 mb-6">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
            {isLoginView ? "Welcome Back" : "Create Account"}
          </h3>
          <p className="text-xs sm:text-sm text-base-content/60">
            {isLoginView
              ? "Enter your username and password to access your account"
              : "Sign up to start shopping and adding items to your bag"}
          </p>
        </div>

        {error && (
          <div role="alert" className="alert alert-error py-2 px-3 mb-4 text-xs sm:text-sm rounded-lg">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <label className="input input-bordered flex items-center gap-3 w-full focus-within:outline-none focus-within:border-neutral">
            <User size={16} className="text-base-content/50 shrink-0" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="grow text-sm"
            />
          </label>

          {!isLoginView && (
            <label className="input input-bordered flex items-center gap-3 w-full focus-within:outline-none focus-within:border-neutral">
              <Mail size={16} className="text-base-content/50 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="grow text-sm"
              />
            </label>
          )}

          <label className="input input-bordered flex items-center gap-3 w-full focus-within:outline-none focus-within:border-neutral">
            <Lock size={16} className="text-base-content/50 shrink-0" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="grow text-sm"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-neutral w-full mt-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isLoginView ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="divider text-xs text-base-content/40 my-5">OR</div>

        <p className="text-center text-xs sm:text-sm text-base-content/70">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleView}
            className="font-bold text-base-content underline hover:opacity-80 cursor-pointer ml-1"
          >
            {isLoginView ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>

      <form method="dialog" className="modal-backdrop bg-neutral/40 backdrop-blur-xs">
        <button onClick={resetForm}>close</button>
      </form>
    </dialog>
  )
}

export default AuthModal