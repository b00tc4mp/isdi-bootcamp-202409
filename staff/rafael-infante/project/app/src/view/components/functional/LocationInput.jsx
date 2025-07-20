import React, { useState } from 'react'
import searchAddress from '../../../logic/ads/searchAddress.js'

export default function LocationInput({ onLocationSelect }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

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
        const results = await searchAddress(value)
        setSuggestions(results)
      } catch (error) {
        console.error(error)
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
