import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const SearchBarIcons = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${query}&city=${city}`);
  };

  const toggleCityDropdown = () => {
    
    const nextCity = prompt("Escribe ciudad: Barcelona, Málaga, Madrid o Valencia");
    if (nextCity) setCity(nextCity);
  };

  return (
    <div className="flex items-center border rounded-full px-4 py-2 shadow-md w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow outline-none bg-transparent"
      />
      <button onClick={toggleCityDropdown} className="text-gray-500 hover:text-black mr-2">
        <MapPin size={20} />
      </button>
      <button onClick={handleSearch} className="text-gray-500 hover:text-black">
        <Search size={20} />
      </button>
    </div>
  );
};

export { SearchBarIcons };
