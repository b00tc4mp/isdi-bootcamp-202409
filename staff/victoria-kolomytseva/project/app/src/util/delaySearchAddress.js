import searchAddress from "../logic/posts/searchAddress.js"

let debounceTimer // asegura que no se hagan llamadas repetidas a una función en intervalos muy cortos

const getSuggestions = async (query, setSuggestions) => {
    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(async () => {//Configura un nuevo temporizador para ejecutar la función anónima después de 500 ms.
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
