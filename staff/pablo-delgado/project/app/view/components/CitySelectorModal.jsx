const cities = ["Barcelona", "Madrid", "Valencia", "Málaga"];

const CitySelectorModal = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-[#006D77]">Buscar por ciudad</h2>
        <ul className="space-y-2">
          {cities.map((city) => (
            <li key={city}>
              <button
                onClick={() => {
                  onSelect(city);
                  onClose();
                }}
                className="w-full text-left px-4 py-2 rounded-md bg-[#83C5BE] hover:bg-[#006D77] hover:text-white transition"
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-[#006D77] underline hover:text-[#004D4D]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export { CitySelectorModal }
