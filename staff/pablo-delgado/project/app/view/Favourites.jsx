import React, { useState, useEffect } from "react";
import Footer from "./components/Footer.jsx";
import { useSettings } from "./SettingsContext.jsx"

const favourites = [
  
  { id: 1, name: "Hospital Veterinària del Mar", type: "Vet", address: "Carrer de Balmes, 123, Barcelona" },
  { id: 2, name: "AniCura Glòries Hospital Veterinari", type: "Vet", address: "Av. Diagonal, 321, Barcelona" },
  { id: 3, name: "Clínica Veterinària Family Vet", type: "Grooming", address: "Carrer de Sants, 45, Barcelona" },
  { id: 4, name: "Lovedogs", type: "Grooming", address: "Gran Via, 120, Barcelona" },
  { id: 5, name: "Woody's Salon", type: "Grooming", address: "Passeig de Gràcia, 88, Barcelona" },
  { id: 6, name: "Waku-Waku Mascotas Paralelo 180", type: "Grooming", address: "Carrer de Casanova, 210, Barcelona" },
  { id: 7, name: "Educación Canina & Cuidadores de Animales -MAMADOG", type: "Trainer", address: "Carrer de la Marina, 200, Barcelona" },
  { id: 8, name: "Boncan Educació Canina", type: "Trainer", address: "Travessera de Gràcia, 55, Barcelona" },
  { id: 9, name: "Dog Care Barcelona", type: "Petsitter", address: "Carrer d'Aragó, 77, Barcelona" },
];

const translations = {
  es: {
    title: "Tus favoritos",
    filter: "Filtrar por tipo:",
    all: "Todos",
    button: "Ver centro",
    empty: "Aún no tienes centros favoritos en esta categoría 🐾",
  },
  en: {
    title: "Your favourites",
    filter: "Filter by type:",
    all: "All",
    button: "View center",
    empty: "You don't have favourite centres in this category yet 🐾",
  },
};

const FavouriteCard = ({ centre, buttonText }) => {
  const url = `http://localhost:5173/partner/${centre.id}`; // URL to center w their ID

  return (
    <div className="bg-white border-2 border-[#006D77] rounded-2xl p-4 mb-4 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">🏥 {centre.name}</h3>
        <p className="text-sm text-gray-600">🔧 {centre.type}</p>
        <p className="text-sm text-gray-600">📍 {centre.address}</p>
      </div>
      <a
        href={url}
        className="bg-yellow-400 hover:bg-yellow-300 text-white font-medium px-3 py-1.5 rounded-lg text-xs whitespace-nowrap text-center"
      >
        {buttonText}
      </a>
    </div>
  );
};



const Favourites = () => {
  const { language } = useSettings();
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState(t.all);

  // Updates selectedCategory if language change
  useEffect(() => {
    setSelectedCategory(t.all);
  }, [t.all]);

  const categories = [t.all, ...new Set(favourites.map((c) => c.type))];

  const filteredFavourites =
    selectedCategory === t.all
      ? favourites
      : favourites.filter((c) => c.type === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4 pb-20">
        <div className="w-full max-w-xl mt-8">
          <h2 className="text-2xl font-bold mt-9 mb-4 text-gray-800 text-center">
            {t.title}
          </h2>

          {/* Dropdown */}
          <div className="mb-6 text-center">
            <label htmlFor="fav-category" className="mr-2 font-medium text-gray-700">
              {t.filter}
            </label>
            <select
              id="fav-category"
              className="bg-[#006D77] text-white font-medium rounded-lg p-2 transition-colors hover:bg-[#005f69] focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category} className="bg-white text-black">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {filteredFavourites.length > 0 ? (
            filteredFavourites.map((centre) => (
              <FavouriteCard key={centre.id} centre={centre} buttonText={t.button} />
            ))
          ) : (
            <p className="text-gray-600 text-center mt-6">{t.empty}</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Favourites;
