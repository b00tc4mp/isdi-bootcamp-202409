import alertIcon from '../../../assets/warning.png'
import confirmIcon from '../../../assets/verified.png'

export default function Alert({ message, level = 'error', onAccepted }) {
  console.debug('Alert -> render')

  // Estilos dinámicos según el nivel
  const bgColor =
    level === 'error'
      ? 'bg-red-200 border-red-500 text-red-800'
      : level === 'warn'
      ? 'bg-yellow-200 border-yellow-500 text-yellow-800'
      : 'bg-green-200 border-green-500 text-green-800'

  const buttonColor =
    level === 'error'
      ? 'bg-red-500 hover:bg-red-600'
      : level === 'warn'
      ? 'bg-yellow-500 hover:bg-yellow-600'
      : 'bg-green-500 hover:bg-green-600'

  const handleAcceptClick = () => onAccepted()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 bg-black z-50">
      <div className={`w-full max-w-md ${bgColor} border rounded-lg shadow-lg p-6 flex flex-col items-center gap-4`}>
        {/* Icono de alerta */}
        <img
          src={level === 'error' || level === 'warn' ? alertIcon : confirmIcon}
          alt="Warning"
          className="w-16 h-16"
        />

        {/* Mensaje */}
        <p className="text-center font-medium text-lg">{message}</p>

        {/* Botón de Aceptar */}
        <button
          className={`text-white px-6 py-2 rounded-md shadow transition duration-200 ${buttonColor}`}
          onClick={handleAcceptClick}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
