import React, { useState } from "react"
import logic from "../../../logic"
import useContext from "../../useContext"
import useLiterals from "../../useLiterals"

export default function LocationInput({ onLocationSelect }) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const { alert } = useContext()
  const literals = useLiterals()

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
        alert(literals(error.message))
      }
    }, 500)
  }

  const handleSelectSuggestion = (suggestion) => {
    onLocationSelect(suggestion.value)
    setQuery(suggestion.label)
    setSuggestions([])
  }

  return (
    <div className="w-full">
      <input
        type="text"
        id="location"
        value={query}
        onChange={handleInputChange}
        placeholder="Escribe una dirección"
        className="focus:outline-none p-2 rounded-lg w-full h-14 mt-4 bg-tertiary text-white focus:ring-2 focus:ring-tertiary"
      />

      <ul className="mt-2">
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
