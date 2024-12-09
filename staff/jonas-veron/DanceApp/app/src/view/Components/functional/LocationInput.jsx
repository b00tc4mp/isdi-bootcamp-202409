import React, { useState } from "react"
import geocodeLogic from "../../../logic/geocode/geocodeLogic.js"

export default function LocationInput({ onLocationSelect }) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = async (event) => {
    const value = event.target.value
    setQuery(value)
    geocodeLogic.getSuggestions(value, setSuggestions, setLoading, setError)
  }

  const handleSelectSuggestion = (suggestion) => {
    onLocationSelect(suggestion.value)
    setQuery(suggestion.label)
    setSuggestions([])
  }

  return (
    <div>
      <label htmlFor="location" className="block text-gray-700">
        Dirección:
      </label>
      <input
        type="text"
        id="location"
        value={query}
        onChange={handleInputChange}
        placeholder="Escribe una dirección"
        className="p-2 border rounded w-full"
      />
      {loading && <p className="text-sm text-gray-500">Buscando...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <ul className="border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSelectSuggestion(suggestion)}
            className="p-2 hover:bg-gray-200 cursor-pointer"
          >
            {suggestion.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
