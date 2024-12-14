import searchAddress from "../logic/posts/searchAddress.js"

let debounceTimer //Debounce: Es una técnica para retrasar la ejecución de una función hasta que hayan transcurrido cierto tiempo (500 ms aquí) desde la última vez que se activó

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
