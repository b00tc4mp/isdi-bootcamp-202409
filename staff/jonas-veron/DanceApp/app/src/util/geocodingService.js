const NOMINATIM_URL = "https://nominatim.openstreetmap.org"

const fetchSuggestions = async (query) => {
  try {
    const response = await fetch(
      `${NOMINATIM_URL}/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1&limit=5&countrycodes=es`
    )
    const data = await response.json()
    return data.map((item) => ({
      label: item.display_name,
      value: {
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        address: item.display_name,
      },
    }))
  } catch (error) {
    console.error("Error al obtener sugerencias:", error)
    throw error
  }
}

export default { fetchSuggestions }
