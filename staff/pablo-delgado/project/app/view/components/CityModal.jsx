import React from 'react';

const cities = ['Barcelona', 'Málaga', 'Madrid', 'Valencia'];

const CityModal = ({ isOpen, onClose, onSelectCity }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-xl text-center">
        <h2 className="text-lg font-semibold text-[#006D77] mb-4">Selecciona una ciudad</h2>
        <ul className="space-y-2">
          {cities.map((city) => (
            <li key={city}>
              <button
                onClick={() => onSelectCity(city.toLowerCase())}
                className="w-full py-2 px-4 rounded-full border border-[#006D77] text-[#006D77] hover:bg-[#006D77] hover:text-white transition"
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CityModal;
