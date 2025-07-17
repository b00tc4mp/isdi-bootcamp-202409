import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Footer } from './components/Footer.jsx'

const calcularEdad = (fecha) => {
  const hoy = new Date();
  const nacimiento = new Date(fecha);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
  return edad;
};

const initialPets = {
  1: {
    name: 'Toby',
    image: 'https://images.unsplash.com/photo-1513549054-cb3611a004fe?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    birthdate: '2019-04-20',
    breed: 'Golden Retriever',
    about: 'Toby es muy cariñoso con los niños.',
    feedback: [
      { text: 'Muy tranquilo con otros perros', author: 'David', role: 'trainer' },
      { text: 'Excelente comportamiento en la clínica', author: 'Clínica Veterinaria FamilyVet', role: '' },
    ],
    summary: {
      friendlyWith: 'dogs, children',
      neutered: 'Yes',
      houseTrained: 'Yes',
      pottyBreak: '3 times a day',
      aloneTime: 'Can be left alone 1-4h',
      feeding: 'Twice a day',
      energy: 'Moderate',
      microchipped: 'Yes',
      health: 'No treatment needed',
    },
  },
  2: {
    name: 'Misu',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    birthdate: '2021-08-15',
    breed: 'Siamés',
    about: 'Misu es muy independiente pero le encanta acurrucarse por las noches.',
    feedback: [
      { text: 'Muy dulce y limpia', author: 'Marta', role: 'cuidadora' },
    ],
    summary: {
      friendlyWith: 'humans',
      neutered: 'Yes',
      houseTrained: 'Yes',
      pottyBreak: 'Litter box',
      aloneTime: 'Can be left alone 5-8h',
      feeding: 'Dry food twice a day',
      energy: 'Low',
      microchipped: 'Yes',
      health: 'No issues',
    },
  },
};

const capitalize = (text) => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const PetDetails = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pets, setPets] = useState(initialPets);

  const pet = pets[petId];

  if (!pet) return <p className="text-center mt-10 text-xl font-semibold">Mascota no encontrada.</p>;

  const edad = calcularEdad(pet.birthdate);

  const handleDelete = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setShowConfirmModal(false);
    const updatedPets = { ...pets };
    delete updatedPets[petId];
    setPets(updatedPets);
    alert('Mascota eliminada (simulado)');
    navigate(-1);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="py-20 px-6 min-h-full relative" style={{ backgroundColor: '#EDF6F9' }}>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md"
        aria-label="Volver atrás"
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <div className="flex items-center gap-4 mb-6 relative w-fit">
        <div className="relative flex items-center gap-4">
        <img
  src={pet.image}
  alt={`${pet.name} foto`}
  className="w-24 h-24 rounded-full object-cover border-2 border-[#006D77] shadow-md"
/>

          <div className="absolute bottom-0 left-20 bg-[#006D77] text-white rounded-full p-1 cursor-pointer hover:bg-blue-600">
            <PlusCircle size={20} weight="fill" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{pet.name}</h1>
          </div>
        </div>
      </div>

      <p><span className="font-bold">Fecha de nacimiento:</span> {pet.birthdate}, {edad} años</p>
<p><span className="font-bold">Raza:</span> {pet.breed}</p>
<p><span className="font-bold">Descripción:</span> {pet.about}</p>

<hr className="my-6 border-t-2" style={{ borderColor: '#006D77' }} />

      <h2 className="mt-6 font-semibold text-xl">Resumen</h2>
      <ul className="pl-4 mt-2">
        {Object.entries(pet.summary).map(([key, value]) => (
          <li key={key} className="mb-1">
            <strong>{capitalize(key)}:</strong> <span className="font-normal">{value}</span>
          </li>
        ))}
      </ul>
      <hr className="my-6 border-t-2" style={{ borderColor: '#006D77' }} />
      
      <h2 className="mt-6 font-semibold text-xl">Feedback de cuidadores/vets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {pet.feedback.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
          >
            <p className="text-gray-700 mb-2">"{item.text}"</p>
            <p className="text-sm text-gray-500">
              — {item.author}{item.role ? `, ${item.role}` : ''}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md"
        >
          <Trash size={20} />
          Delete Pet
        </button>
      </div>

      {/* confirm modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this pet?</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
  
};

export default PetDetails;
