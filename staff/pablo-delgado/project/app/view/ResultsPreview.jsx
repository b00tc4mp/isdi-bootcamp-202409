import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPreview = ({ imageUrl, name, category, address, objectID }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/partner/${objectID}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-3xl mb-6 flex border-2 border-[#006D77]">
      <img
        className="h-auto w-48 object-cover"
        src={imageUrl || 'https://picsum.photos/400/300'}
        alt={name}
      />
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-blue-500 mt-1">{category}</p>
          <p className="text-sm text-gray-500 mt-2">📍 {address}</p>
        </div>
        <div className="mt-4">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPreview;
