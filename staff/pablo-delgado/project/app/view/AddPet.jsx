import { useSettings } from "./SettingsContext.jsx";
import { ArrowLeft } from 'phosphor-react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Footer } from './components/Footer.jsx'

const translations = {
  en: {
    title: "Add a New Pet",
    name: "Name",
    birthdate: "Birthdate",
    breed: "Breed",
    about: "About your pet",
    summary: "Summary",
    friendly: "Friendly with...",
    neutered: "Neutered / Spayed?",
    houseTrained: "House trained?",
    potty: "Potty break schedule",
    alone: "Can be left alone?",
    feeding: "Feeding schedule",
    energy: "Energy level",
    microchipped: "Microchipped?",
    health: "Health instructions",
    submit: "Add Pet",
    backAria: "Go back"
  },
  es: {
    title: "Añadir una Mascota Nueva",
    name: "Nombre",
    birthdate: "Fecha de nacimiento",
    breed: "Raza",
    about: "Sobre tu mascota",
    summary: "Resumen",
    friendly: "Sociable con...",
    neutered: "¿Esterilizado / Castrado?",
    houseTrained: "¿Está educado en casa?",
    potty: "Horario para ir al baño",
    alone: "¿Puede quedarse solo?",
    feeding: "Horario de comida",
    energy: "Nivel de energía",
    microchipped: "¿Tiene microchip?",
    health: "Instrucciones de salud",
    submit: "Añadir mascota",
    backAria: "Volver atrás"
  }
};

const AddPet = () => {
  const { language } = useSettings();
  const t = translations[language] || translations.en;
  const navigate = useNavigate();

  // States for the "Yes / No" buttons
  const [isNeutered, setIsNeutered] = useState(null);
  const [isMicrochipped, setIsMicrochipped] = useState(null);
  const [canBeAlone, setCanBeAlone] = useState(null);

  const renderYesNoButtons = (value, setValue) => (
    <div className="flex gap-4 mt-2">
      <button
        type="button"
        className={`px-4 py-2 rounded-full border ${value === true ? 'bg-[#006D77] text-white' : 'bg-white text-[#006D77] border-[#006D77]'}`}
        onClick={() => setValue(true)}
      >
        {language === 'es' ? 'Sí' : 'Yes'}
      </button>
      <button
        type="button"
        className={`px-4 py-2 rounded-full border ${value === false ? 'bg-[#006D77] text-white' : 'bg-white text-[#006D77] border-[#006D77]'}`}
        onClick={() => setValue(false)}
      >
        {language === 'es' ? 'No' : 'No'}
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-xl mx-auto pb-40 bg-white min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md z-10"
        aria-label={t.backAria}
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <div className="mt-16">
        <h1 className="text-2xl font-bold mb-6 text-[#006D77]">{t.title}</h1>
        <form className="grid grid-cols-1 gap-3">
          <input placeholder={t.name} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />
          <input type="date" placeholder={t.birthdate} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />
          <input placeholder={t.breed} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />

          <textarea
            placeholder={t.about}
            className="p-2 text-sm border rounded-md bg-[#006D77] text-white placeholder-white border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE] h-24 resize-none"
          />

          <h2 className="font-semibold mt-4 text-[#006D77]">{t.summary}</h2>
          <input placeholder={t.friendly} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />
          <input placeholder={t.houseTrained} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />

          {/* Neutered */}
          <label className="text-sm text-gray-700">{t.neutered}</label>
          {renderYesNoButtons(isNeutered, setIsNeutered)}

          {/* Microchipped */}
          <label className="text-sm text-gray-700 mt-4">{t.microchipped}</label>
          {renderYesNoButtons(isMicrochipped, setIsMicrochipped)}

          {/* Can be left alone */}
          <label className="text-sm text-gray-700 mt-4">{t.alone}</label>
          {renderYesNoButtons(canBeAlone, setCanBeAlone)}

          <input placeholder={t.potty} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />
          <input placeholder={t.feeding} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />
          <input placeholder={t.energy} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />
          <input placeholder={t.health} className="p-2 text-sm border rounded-md border-[#006D77] focus:outline-none focus:ring-2 focus:ring-[#83C5BE]" />

          <button type="submit" className="bg-[#006D77] text-white py-2 rounded-md hover:bg-[#005960] transition-colors mt-6">
            {t.submit}
          </button>
        </form>
      </div>
            
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AddPet;
