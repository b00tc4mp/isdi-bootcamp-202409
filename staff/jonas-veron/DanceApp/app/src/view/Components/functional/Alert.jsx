export default function Alert({ message, level = "error", onAccepted }) {
  const borderColor =
    level === "error"
      ? "border-[#eb4747]"
      : level === "warn"
      ? "border-[yellow]"
      : "border-[green]"

  const handleAcceptClick = () => onAccepted()

  return (
    <div className="fixed h-full w-full bg-black bg-opacity-50 top-0 flex items-center justify-center mb-12">
      <div
        className={`min-w-[25rem] max-w-[50rem] min-h-[10rem] bg-gradient-to-r from-secondary to-tertiary ${borderColor} border-[0.1rem] flex flex-col items-center justify-center p-4 gap-4 rounded-xl`}
      >
        <p className="text-2xl text-white">{message}</p>
        <button
          className="bg-[#eb4747] w-52 mt-6 h-10 rounded-2xl text-white font-bold border-2 border-transparent hover:bg-accentgreen hover:border-accentpink focus:outline-none focus:ring-2 focus:ring-accentgreen transition duration-300"
          onClick={handleAcceptClick}
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
