export default function Confirm({
  message,
  level = "error",
  onAccepted,
  onCancelled,
}) {
  const colors = {
    error: {
      border: "border-red-500",
      bg: "bg-red-600 bg-opacity-90",
      text: "text-red-100",
      buttonAccept: "bg-red-500 hover:bg-red-700 text-white",
      buttonCancel: "bg-gray-400 hover:bg-gray-600 text-white",
    },
    warn: {
      border: "border-pink-400",
      bg: "bg-pink-600 bg-opacity-80",
      text: "text-pink-100",
      buttonAccept: "bg-pink-400 hover:bg-pink-700 text-white",
      buttonCancel: "bg-gray-400 hover:bg-gray-600 text-white",
    },
    success: {
      border: "border-green-500",
      bg: "bg-green-600 bg-opacity-90",
      text: "text-green-100",
      buttonAccept: "bg-green-500 hover:bg-green-700 text-white",
      buttonCancel: "bg-gray-400 hover:bg-gray-600 text-white",
    },
  }

  const currentColor = colors[level] || colors.error

  return (
    <div className="fixed h-full w-full bg-black bg-opacity-50 top-0 flex items-center justify-center z-50">
      <div
        className={` rounded-lg shadow-lg flex flex-col items-center justify-center gap-6 p-6 ${currentColor.bg} ${currentColor.border} border-2 backdrop-blur-md`}
      >
        <p className={`text-xl font-bold ${currentColor.text} text-center`}>
          {message}
        </p>
        <div className="flex space-x-4">
          <button
            className={`px-6 py-2 rounded-full text-lg font-semibold focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${currentColor.buttonCancel}`}
            onClick={onCancelled}
          >
            Cancelar
          </button>
          <button
            className={`px-6 py-2 rounded-full text-lg font-semibold focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${currentColor.buttonAccept}`}
            onClick={onAccepted}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
