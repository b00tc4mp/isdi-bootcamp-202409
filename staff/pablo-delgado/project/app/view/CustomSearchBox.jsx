import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomSearchBox = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query && query.trim()) {
      navigate(`/results?query=${encodeURIComponent(query)}`);
    }
  };
  

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg relative mb-6">
      <input
  type="text"
  name="query"
  placeholder="Ej: vets..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="w-full p-4 pr-12 pl-4 rounded-full text-black shadow-md border-2 border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#006D77]"
/>
      <button type="submit" className="search-button">Search</button>

    </form>
  );
};

export default CustomSearchBox;
