import geocodingService from "../../util/geocodingService.js"

let debounceTimer

const getSuggestions = async (query, setSuggestions, setLoading, setError) => {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(async () => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    setLoading(true)
    setError("")
    try {
      const results = await geocodingService.fetchSuggestions(query)
      setSuggestions(results)
    } catch (error) {
      console.error("Error al buscar sugerencias:", error)
      setError("No se pudo conectar con el servidor. Intenta más tarde.")
    } finally {
      setLoading(false)
    }
  }, 500)
}

export default { getSuggestions }
