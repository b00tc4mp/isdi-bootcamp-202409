import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import Footer from "./components/Footer.jsx";
import { useSettings } from './SettingsContext.jsx'

const reviews = [
  // Vets
  {
    id: 1,
    category: "Vet",
    name: "VetCare Barcelona",
    review: "Trataron a mi perrita con muchísimo cariño. Muy profesionales y atentos.",
  },
  {
    id: 2,
    category: "Vet",
    name: "AnimalClinic BCN",
    review: "Atención rápida y eficaz. Diagnóstico acertado y seguimiento perfecto.",
  },
  {
    id: 3,
    category: "Vet",
    name: "HealthyPets",
    review: "Excelente trato, aunque la espera fue un poco larga.",
  },

  // Grooming
  {
    id: 4,
    category: "Grooming",
    name: "HappyGroom",
    review: "Mi gato salió oliendo a gloria y sin un solo nudo. ¡Repetiremos seguro!",
  },
  {
    id: 5,
    category: "Grooming",
    name: "DogStyle BCN",
    review: "Buena experiencia en general, aunque podrían mejorar el corte.",
  },

  // Trainers
  {
    id: 6,
    category: "Trainer",
    name: "Dog Trainers BCN",
    review: "Mi perro dejó de tirar de la correa en dos sesiones. ¡Milagro!",
  },
  {
    id: 7,
    category: "Trainer",
    name: "AdiestraTop",
    review: "Muy majos, pero creo que necesitaríamos más sesiones para ver cambios.",
  },
  {
    id: 8,
    category: "Trainer",
    name: "Caninos Pro",
    review: "Excelente técnica y paciencia con perros nerviosos. Muy recomendados.",
  },

  // Boarding
  {
    id: 9,
    category: "Boarding",
    name: "DogHotel BCN",
    review: "Mi perra se quedó 4 días y volvió feliz. Me mandaban fotos cada día.",
  },
  {
    id: 10,
    category: "Boarding",
    name: "PawsInn",
    review: "Las instalaciones son limpias y seguras. Buena opción para vacaciones.",
  },

  // Petsitter
  {
    id: 11,
    category: "Petsitter",
    name: "Luna Cuida Mascotas",
    review: "Muy responsable, cuidó de mi gato como si fuera suyo.",
  },
  {
    id: 12,
    category: "Petsitter",
    name: "PetFriend BCN",
    review: "Le dejé mis dos conejos y todo fue genial. ¡Volveré a contactar!",
  },
  {
    id: 13,
    category: "Petsitter",
    name: "Ana Pet Lover",
    review: "Puntual, amable y me mandó vídeos diarios. ¡Un 10!",
  },
];

const ReviewCard = ({ item }) => {
  return (
    <div className="bg-white border-2 border-[#006D77] rounded-2xl p-4 mb-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">🐾 {item.name}</h3>
      <p className="text-sm text-gray-600 italic">"{item.review}"</p>
    </div>
  );
};

const ReviewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const navigate = useNavigate();
  const { language } = useSettings();  // Uses context language

  const categories = ["Todos", ...new Set(reviews.map((r) => r.category))];


  const t = {
    title: language === 'es' ? 'Reseñas de usuarios' : 'User Reviews',
    filterLabel: language === 'es' ? 'Filtrar por tipo:' : 'Filter by type:',
    allReviews: language === 'es' ? 'Todos' : 'All reviews',
    noReviews: language === 'es' ? 'No hay reseñas para esta categoría aún 🐾' : 'No reviews for this category yet 🐾',
    backAria: language === 'es' ? 'Volver atrás' : 'Go back',
  };

  const filteredReviews =
    selectedCategory === "Todos" || selectedCategory === "All reviews"
      ? reviews
      : reviews.filter((r) => r.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#EDF6F9]">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md"
        aria-label={t.backAria}
      >
        <ArrowLeft size={24} weight="bold" />
      </button>
      <div className="flex-1 flex flex-col pt-10 justify-center items-center px-4 pb-20">
        <div className="w-full max-w-xl mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">{t.title}</h2>

          {/* Dropdown */}
          <div className="mb-6 text-center">
            <label htmlFor="category-select" className="mr-2 font-medium text-gray-700">
              {t.filterLabel}
            </label>
            <select
              id="category-select"
              className="bg-[#006D77] text-white font-medium rounded-lg p-2 transition-colors hover:bg-[#005f69] focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option
                  key={index}
                  value={category}
                  className="bg-white text-black"
                >
                  {category === "Todos" ? t.allReviews : category}
                </option>
              ))}
            </select>
          </div>

          {filteredReviews.length > 0 ? (
            filteredReviews.map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-600 text-center mt-6">{t.noReviews}</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewsPage;