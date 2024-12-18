export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
  console.debug('Confirm -> render')

  // Estilos dinámicos según el nivel
  const bgColor =
    level === 'error'
      ? 'bg-red-200 border-red-500 text-red-800'
      : level === 'warn'
      ? 'bg-yellow-200 border-yellow-500 text-yellow-800'
      : 'bg-green-200 border-green-500 text-green-800'

  const buttonAcceptColor =
    level === 'error'
      ? 'bg-red-500 hover:bg-red-600'
      : level === 'warn'
      ? 'bg-yellow-500 hover:bg-yellow-600'
      : 'bg-green-500 hover:bg-green-600'

  const buttonCancelColor = 'bg-gray-300 hover:bg-gray-400 text-black'

  const handleCancelClick = () => onCancelled()
  const handleAcceptClick = () => onAccepted()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 bg-black z-50">
      <div className={`w-full max-w-md ${bgColor} border rounded-lg shadow-lg p-6 flex flex-col items-center gap-4`}>
        {/* Mensaje */}
        <p className="text-center font-medium text-lg">{message}</p>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            className={`px-6 py-2 rounded-md shadow transition duration-200 ${buttonCancelColor}`}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-2 rounded-md shadow transition duration-200 text-white ${buttonAcceptColor}`}
            onClick={handleAcceptClick}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
