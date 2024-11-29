import logic from "./../../../logic"
import { useNavigate, Link } from "react-router-dom"

export default function Menu({ isOpen, onClose }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.confirm("¿Estás seguro de cerrar sesión?")
    logic.logoutUser()
    navigate("/login")
    onClose()
  }

  if (!isOpen) return null
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-20 flex flex-col justify-between p-4 mt-10">
      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-left w-full">
          Mi Perfil
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-left w-full">
          Profesores
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-left w-full">
          Escuelas de baile
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-left w-full">
          Sociales
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-left w-full">
          Congresos
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-left w-full">
          Mapa
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-left w-full"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
