import Image from "next/image";

export default function ExCompra() {
  return (
    <div className="flex flex-col items-center py-20">
      <h2 className="text-2xl font-bold text-center mb-4">En Ekoality tú decides...</h2>
      <h3 className="text-xl text-center mb-8">¿Quieres productos de proximidad y calidad?</h3>
      <div className="flex justify-center items-center space-x-4">
        {/* Paso 1 */}
        <div className="flex flex-col items-center group">
          <div className="bg-warning p-4 rounded-lg flex flex-col items-center transform transition duration-300 group-hover:translate-x-4">
            <Image src="/icons/bx-wink-smile.svg" alt="Registro en Ekoality" width={48} height={48} />
            <h3 className="text-white mt-2 text-center">Regístrate en Ekoality</h3>
          </div>
        </div>

        {/* Paso 2 */}
        <div className="flex flex-col items-center group">
          <div className="bg-zinc-600 p-4 rounded-lg flex flex-col items-center transform transition duration-300 group-hover:translate-x-4">
            <Image src="/icons/bx-search.svg" alt="Busca un producto" width={48} height={48} />
            <h3 className="text-white mt-2 text-center">Busca un producto</h3>
          </div>
        </div>

        {/* Paso 3 */}
        <div className="flex flex-col items-center group">
          <div className="bg-accent p-4 rounded-lg flex flex-col items-center transform transition duration-300 group-hover:translate-x-4">
            <Image src="/icons/bx-conversation.svg" alt="Chatea con el vendedor" width={48} height={48} />
            <h3 className="text-white mt-2 text-center">Chatea con el vendedor</h3>
          </div>
        </div>

        {/* Paso 4 */}
        <div className="flex flex-col items-center group">
          <div className="bg-secondary p-4 rounded-lg flex flex-col items-center transform transition duration-300 group-hover:-translate-x-4 ">
            <Image src="/icons/acuerdo.svg" alt="Llega a un acuerdo" width={48} height={48} />
            <h3 className="text-white mt-2 text-center">Llega a un acuerdo</h3>
          </div>
        </div>
      </div>

      {/* Bloque final */}
      <div className="mt-12 flex flex-col items-center bg-green-600 text-white py-12 px-8 rounded-lg hover:bg-white hover:text-green-600 border-2 border-green-600 transition duration-300 group">
        {/* Ícono de corazón */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 mb-4 text-white group-hover:text-green-600 transition duration-300">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {/* Texto */}
        <h3 className="text-2xl font-bold text-center">Disfruta de tus ganancias</h3>
      </div>
    </div>
  );
}
