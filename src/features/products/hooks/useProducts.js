import { useEffect, useState } from "react"

const API_URL =
  import.meta.env.VITE_API_URL || "https://nfrxstore-api.vercel.app"

export function useProducts() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/api/products`)
        if (!response.ok) {
          throw new Error("Failed to load products")
        }
        const data = await response.json()
        setResults(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { results, loading, error }
}
