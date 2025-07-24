import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InstantSearch, Hits, Configure } from 'react-instantsearch-dom';
import { ArrowLeft } from 'phosphor-react';
import searchClient from '../logic/algoliawrapper.js';
import { useSettings } from './SettingsContext.jsx';
import Footer from './components/Footer.jsx'


const categoryDescriptions = {
  veterinario: {
    es: "Centro veterinario donde un equipo de profesionales cualificados cuida de la salud de tu mascota con dedicación y cariño. Ofrecen servicios médicos, vacunaciones, revisiones, urgencias y mucho más, siempre velando por el bienestar animal.",
    en: "Veterinary center where a team of qualified professionals cares for your pet's health with dedication and affection. They offer medical services, vaccinations, check-ups, emergencies, and much more, always ensuring animal welfare."
  },
  peluquería: {
    es: "Expertos en estética y cuidado animal que se aseguran de que tu compañero peludo no solo esté limpio, sino que luzca espectacular. Cortes adaptados a cada raza, baños relajantes y tratamientos especiales para su piel y pelo.",
    en: "Experts in pet grooming who ensure your furry friend is not only clean but looks spectacular. Cuts tailored to each breed, relaxing baths, and special treatments for skin and coat."
  },
  guardería: {
    es: "Un espacio seguro, supervisado y lleno de estímulos donde tu mascota puede pasar el día mientras tú estás fuera. Ideal para socializar, jugar, descansar y recibir atención continua en un entorno amigable y controlado.",
    en: "A safe, supervised, and stimulating space where your pet can spend the day while you are away. Ideal for socializing, playing, resting, and receiving continuous care in a friendly and controlled environment."
  },
  adiestrador: {
    es: "Educadores profesionales que trabajan el comportamiento, la obediencia y la conexión entre tú y tu mascota. Utilizan métodos positivos para lograr una convivencia armónica y resolver problemas de conducta de forma respetuosa.",
    en: "Professional trainers who work on behavior, obedience, and the bond between you and your pet. They use positive methods to achieve harmonious coexistence and solve behavioral problems respectfully."
  }
};

// "fake" services
const fakeServicesByCategory = {
  veterinario: {
    es: ["Vacunación", "Revisión general", "Urgencias 24h", "Desparasitación"],
    en: ["Vaccination", "General check-up", "24h emergencies", "Deworming"]
  },
  peluquería: {
    es: ["Corte básico", "Baño relajante", "Desenredado de pelo", "Tratamientos antipulgas"],
    en: ["Basic cut", "Relaxing bath", "Detangling", "Anti-flea treatments"]
  },
  guardería: {
    es: ["Juegos y socialización", "Paseos diarios", "Descanso supervisado", "Comidas programadas"],
    en: ["Games and socialization", "Daily walks", "Supervised rest", "Scheduled meals"]
  },
  adiestrador: {
    es: ["Obediencia básica", "Resolución de problemas de conducta", "Adiestramiento avanzado", "Socialización canina"],
    en: ["Basic obedience", "Behavior problem solving", "Advanced training", "Dog socialization"]
  }
};

const PartnerHit = ({ hit }) => {
  const { language } = useSettings(); 
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // go back button translation
  const t = {
    backAria: language === 'es' ? 'Volver atrás' : 'Go back',
  };

  // Safe function to get category in lowercase only if it's a string
  const categoryKey = typeof hit.category === 'string' ? hit.category.toLowerCase() : null;

  // Description text based on language
  const descriptionFallback = (categoryKey && categoryDescriptions[categoryKey]) ? 
    categoryDescriptions[categoryKey][language] : 
    (language === 'es' 
      ? "Centro especializado en servicios para mascotas. Profesionales comprometidos con la salud, el bienestar y la felicidad de tu compañero peludo." 
      : "Specialized center offering services for pets. Professionals committed to your furry friend's health, well-being, and happiness.");

  const fakeServices = (categoryKey && fakeServicesByCategory[categoryKey]) ? 
    fakeServicesByCategory[categoryKey][language] : 
    (language === 'es' 
      ? ["Consulta general", "Cuidado personalizado", "Atención especializada"] 
      : ["General consultation", "Personalized care", "Specialized attention"]);

  const handleReserveClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const isMobile = /iPhone|Android/i.test(navigator.userAgent);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="bg-[#EDF6F9] text-gray-800 w-full overflow-x-hidden min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md"
        aria-label={t.backAria}
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      {/* header */}
      <div className="w-screen">
        <img src={hit.image} alt={hit.name} className="w-screen h-72 md:h-96 object-cover" />
      </div>

      {/* main */}
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{hit.name}</h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {hit.description || descriptionFallback}
        </p>

        <div className="bg-white p-6 rounded-xl shadow-xl text-left">
          <p className="mb-2">
            <strong>{language === 'es' ? 'Dirección:' : 'Address:'}</strong> {hit.address}
          </p>
          {hit.hours && (
            <p className="mb-4 whitespace-pre-line">
              <strong>{language === 'es' ? 'Horario:' : 'Opening hours:'}</strong> {hit.hours}
            </p>
          )}

          <div className="mb-4">
            <strong>{language === 'es' ? 'Servicios disponibles:' : 'Available services:'}</strong>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {fakeServices.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleReserveClick}
              className="bg-[#006D77] hover:bg-[#005a63] text-white font-bold py-2 px-6 rounded"
            >
              {language === 'es' ? 'Reserva ya' : 'Reserve now'}
            </button>
          </div>
        </div>
      </div>

      <div className="h-16" />

      {/* Contact modal */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div
      ref={modalRef}
      className="bg-white p-6 rounded-lg shadow-lg text-center w-80 border-2"
      style={{ borderColor: '#006d77' }}
    >
      <h2 className="text-xl font-semibold mb-4">{language === 'es' ? 'Contacto' : 'Contact'}</h2>
      
      <div className="mb-4">
        {hit.phoneNumber ? (
          isMobile ? (
            <a href={`tel:${hit.phoneNumber}`} className="text-[#006D77] font-bold text-lg underline">
              {language === 'es' ? `Llamar al ${hit.phoneNumber}` : `Call ${hit.phoneNumber}`}
            </a>
          ) : (
            <p className="text-gray-800 font-bold text-lg">{hit.phoneNumber}</p>
          )
        ) : (
          <p>{language === 'es' ? 'No hay número disponible.' : 'No phone number available.'}</p>
        )}
      </div>

      <button
        onClick={handleCloseModal}
        className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-4 rounded"
      >
        {language === 'es' ? 'Cerrar' : 'Close'}
      </button>
    </div>
  </div>
)}

<Footer />
    </div>
  );
};

function PartnerProfile() {
  const { id } = useParams();


  return (
    <InstantSearch searchClient={searchClient} indexName="searchengine">
      <Configure filters={`objectID:${id}`} hitsPerPage={1} />
      <Hits hitComponent={PartnerHit} />
    </InstantSearch>
  );
}

export default PartnerProfile;
