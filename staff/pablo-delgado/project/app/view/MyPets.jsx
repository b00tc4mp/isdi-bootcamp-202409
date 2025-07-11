import { Link, useNavigate } from 'react-router-dom';
import { Dog, Cat } from 'lucide-react';
import { ArrowLeft } from 'phosphor-react';
import { Footer } from './components/Footer.jsx'

const MyPets = () => {
  const navigate = useNavigate();

  const pets = [
    { id: 1, name: 'Toby', type: 'Perro' },
    { id: 2, name: 'Misu', type: 'Gato' },
  ];

  const getIcon = (type) => {
    if (type.toLowerCase() === 'perro') return <Dog className="text-[#006d77]" />;
    if (type.toLowerCase() === 'gato') return <Cat className="text-[#006d77]" />;
    return null;
  };

  return (
    <div className="pt-20 px-6 min-h-screen bg-[#] relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006d77] hover:bg-[#055d66] text-white shadow-md"
        aria-label="Volver atrás"
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center text-[#006d77]">My Pets</h1>

      <ul className="space-y-4">
        {pets.map((pet) => (
          <li key={pet.id}>
            <Link
              to={`/pets/${pet.id}`}
              className="flex items-center justify-between p-4 border border-[#006D77] bg-white rounded-xl shadow hover:bg-[#83c5be] transition-all"
            >
              <span className="text-lg font-medium text-[#006d77]">{pet.name}</span>
              {getIcon(pet.type)}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to="/addpet"
        className="fixed bottom-20 right-4 bg-[#006d77] text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-[#055d66] transition"
      >
        + Add Pet
      </Link>
      
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
  
};

export default MyPets;
