import searchAddress from '../logic/ads/searchAddress.js'

let debounceTimer

const getSuggestions = async (query, setSuggestions) => {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(async () => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    try {
      const results = await searchAddress(query)
      setSuggestions(results)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }, 500)
}

export default { getSuggestions }
