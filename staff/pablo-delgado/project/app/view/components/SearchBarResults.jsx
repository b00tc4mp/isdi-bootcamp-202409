import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from "lucide-react";

const cities = ["Barcelona", "Málaga", "Madrid", "Valencia"];
const categories = [
  { label: "Veterinario", value: "vet" },
  { label: "Peluquería", value: "grooming" },
  { label: "Cuidado", value: "petsitter" }
];

const SearchBarResults = ({ initialQuery = "", initialCity = "Barcelona", initialCategory = "" }) => {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [category, setCategory] = useState(initialCategory);
  const [openCityDropdown, setOpenCityDropdown] = useState(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}&city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto mt-4 px-2 relative z-10">
      
      {/* Text input */}
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006D77]"
      />

      {/* City dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpenCityDropdown(!openCityDropdown)}
          className="w-full flex justify-between items-center px-4 py-2 text-sm rounded-full border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
        >
          {city}
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        {openCityDropdown && (
          <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
            {cities.map((c) => (
              <li
                key={c}
                onClick={() => {
                  setCity(c);
                  setOpenCityDropdown(false);
                }}
                className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer rounded-xl text-black"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
          className="w-full flex justify-between items-center px-4 py-2 text-sm rounded-full border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
        >
          {category ? categories.find(c => c.value === category)?.label : "Selecciona categoría"}
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        {openCategoryDropdown && (
          <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
            {categories.map((cat) => (
              <li
                key={cat.value}
                onClick={() => {
                  setCategory(cat.value);
                  setOpenCategoryDropdown(false);
                }}
                className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer rounded-xl text-black"
              >
                {cat.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="w-full px-4 py-2 text-sm rounded-full text-white font-medium shadow-md bg-[#006D77] hover:bg-[#005B66] transition"
      >
        Search
      </button>
    </div>
  );
};

export { SearchBarResults };
