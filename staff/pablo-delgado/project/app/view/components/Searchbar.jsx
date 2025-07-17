import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, selectedCity });
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-4">
      
      <div className="relative w-full">
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </g>
        </svg>
        <input
          type="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 w-full rounded-full bg-white text-black text-base shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Dropdown n button */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {/* City dropdown */}
        <div className="dropdown dropdown-end w-full sm:w-auto">
          <div
            tabIndex={0}
            role="button"
            className="btn w-full sm:w-auto"
          >
            {selectedCity || 'Localización'}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-md"
          >
            {['Madrid', 'Barcelona', 'Sevilla', 'Valencia'].map((city) => (
              <li key={city}>
                <a onClick={() => setSelectedCity(city)}>{city}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Search button */}
        <button
          className="btn w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export { SearchBar };
