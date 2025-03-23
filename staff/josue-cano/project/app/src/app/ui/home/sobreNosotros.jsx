import Image from "next/image";

export default function sobreNosotros() {
  return (
    <div id="sobrenosotros" className="flex flex-col w-responsive items-center py-56 space-y-12 ">
      {/* Encabezado */}
      <div className="text-center max-w-3xl ">
        <h1 className="text-4xl font-bold mb-6">Somos una nueva opción...</h1>
        <p className="text-lg text-gray-700">
          Ekoality es una plataforma que promueve la compra y venta de alimentos de calidad y proximidad, fomentando el
          comercio local y sostenible. Nos dedicamos a conectar a productores y consumidores para que puedan
          intercambiar productos frescos y saludables, reduciendo la distancia entre ellos y contribuyendo a un estilo
          de vida más consciente y respetuoso con el medio ambiente.
        </p>
      </div>

      {/* Iconos con descripciones */}
      <div className="flex flex-row flex-wrap  justify-center space-x-12">
        {/* Bloque 1 */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-xs">
          <Image src="/icons/ahorro.svg" alt="Icono ahorro" width={80} height={80} />
          <h2 className="text-lg font-semibold text-gray-800">Para gastar menos en tu compra de la semana</h2>
          <p className="text-sm text-gray-600">
            Encontrarás frutas y verduras a precios con los que tu supermercado de confianza no puede competir.
          </p>
        </div>

        {/* Bloque 2 */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-xs">
          <Image src="/icons/proximidad.svg" alt="Icono proximidad" width={80} height={80} />
          <h2 className="text-lg font-semibold text-gray-800">Para conseguir alimentos de proximidad</h2>
          <p className="text-sm text-gray-600">
            Promovemos el comercio local y sostenible. Podrás buscar alimentos cultivados cerca de donde vives de una
            forma sencilla.
          </p>
        </div>

        {/* Bloque 3 */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-xs">
          <Image src="/icons/dinero.svg" alt="Icono dinero" width={80} height={80} />
          <h2 className="text-lg font-semibold text-gray-800">Para aprovechar al máximo tus cosechas</h2>
          <p className="text-sm text-gray-600">
            Si tienes cosechas, podrás subir tus alimentos y venderlos o intercambiarlos, para que no desaproveches los
            frutos de tus tierras.
          </p>
        </div>
      </div>
    </div>
  );
}
