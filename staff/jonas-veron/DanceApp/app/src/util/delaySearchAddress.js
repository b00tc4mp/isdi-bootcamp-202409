import searchAddress from "../logic/events/searchAddress.js"

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
    }
  }, 500)
}

export default { getSuggestions }
