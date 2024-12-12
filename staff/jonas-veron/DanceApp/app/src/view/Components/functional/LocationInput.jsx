import React, { useState } from "react"
import logic from "../../../logic"
import useContext from "../../useContext"

export default function LocationInput({ onLocationSelect }) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const { alert } = useContext()

  let debounceTimer
  const handleInputChange = async (event) => {
    const value = event.target.value
    setQuery(value)

    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      if (!value.trim()) {
        setSuggestions([])
        return
      }
      try {
        const results = await logic.searchAddress(value)
        setSuggestions(results)
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
    }, 500)
  }

  const handleSelectSuggestion = (suggestion) => {
    onLocationSelect(suggestion.value)
    setQuery(suggestion.label)
    setSuggestions([])
  }

  return (
    <div>
      <input
        type="text"
        id="location"
        value={query}
        onChange={handleInputChange}
        placeholder="Escribe una dirección"
        className="focus:outline-none p-2 rounded w-full mt-2 bg-tertiary text-white focus:ring-2 focus:ring-tertiary"
      />

      <ul className="border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSelectSuggestion(suggestion)}
            className="p-2 cursor-pointer text-white bg-tertiary"
          >
            {suggestion.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
