"use client";
import { useEffect, useState } from "react";
export default function SearchComponent({ searchTerm, setSearchTerm }) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(searchTerm);
  }, [searchTerm]);

  const searchProduct = (evt) => {
    evt.preventDefault();
    setSearchTerm(keyword);
  };

  return searchTerm ? (
    <section className="flex justify-center mt-4">
      <form
        onSubmit={(evt) => searchProduct(evt)}
        className="flex items-center bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-w-3xl overflow-hidden border border-gray-300">
        {/* Submits form on ENTER */}
        <input
          type="text"
          onChange={(evt) => setKeyword(evt.target.value)}
          value={keyword}
          placeholder="Buscar alimento"
          className="flex-grow px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none"
        />
        <button
          type="reset"
          onClick={() => setSearchTerm("")}
          className="bg-gray-100 px-5 py-3 hover:bg-gray-700 hover:text-white transition duration-300 font-semibold shadow-md rounded-l-lg">
          &times;
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-3 hover:bg-green-700 transition duration-300 font-semibold shadow-md rounded-r-lg">
          Buscar
        </button>
      </form>
    </section>
  ) : (
    <div className="min-h-screen bg-cover bg-center">
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/video/campos.mp4"
        muted
        loop></video>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Título */}
        <h1 className="text-5xl md:text-4xl font-extrabold text-white mb-8 drop-shadow-md">
          Encuentra y vende alimentos de proximidad
        </h1>

        {/* Barra de búsqueda */}
        <form
          onSubmit={(evt) => searchProduct(evt)}
          className="flex items-center bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-w-3xl overflow-hidden border border-gray-300">
          <input
            type="text"
            onChange={(evt) => setKeyword(evt.target.value)}
            value={keyword}
            placeholder="Buscar alimento"
            className="flex-grow px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 hover:bg-green-700 transition duration-300 font-semibold shadow-md rounded-r-lg">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}
