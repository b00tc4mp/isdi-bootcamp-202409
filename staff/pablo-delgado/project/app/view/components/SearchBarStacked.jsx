import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const cities = ["Barcelona", "Málaga", "Madrid", "Valencia"];

const SearchBarStacked = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Barcelona");
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    // go to /results w query and city in URL
    navigate(`/results?query=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto mt-6 px-4 relative z-10">
      {/* placeholder */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006D77]"
      />

      {/* City dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="w-full flex justify-between items-center px-4 py-3 rounded-full border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
        >
          {city}
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </button>

        {openDropdown && (
          <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
            {cities.map((c) => (
              <li
                key={c}
                onClick={() => {
                  setCity(c);
                  setOpenDropdown(false);
                }}
                className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer rounded-xl text-black"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* search button */}
      <button
        onClick={handleSearch}
        className="w-full px-4 py-3 rounded-full text-white font-medium shadow-md bg-[#006D77] hover:bg-[#005B66] transition"
      >
        Search
      </button>
    </div>
  );
};


export { SearchBarStacked };
