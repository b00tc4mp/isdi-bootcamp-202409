export default function Contacto() {
  return (
    <div className="flex flex-col items-center py-20">
      {/* Título */}
      <h2 className="text-3xl font-bold text-center mb-4">¿Necesitas ayuda?</h2>
      {/* Subtítulo */}
      <p className="text-lg text-center text-gray-700">
        Escríbenos a{" "}
        <a
          href="mailto:contacto@ekoality.es"
          className="font-bold text-black hover:text-green-600 transition duration-300">
          contacto@ekoality.es
        </a>{" "}
        y te contestaremos lo antes posible.
      </p>
    </div>
  );
}
