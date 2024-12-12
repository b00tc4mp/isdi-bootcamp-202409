import logic from "./../../../logic"
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import useContext from "../../useContext"

export default function Menu({ isOpen, onClose }) {
  console.log("render -> menu")
  const navigate = useNavigate()
  const { alert, confirm } = useContext()
  const [name, setName] = useState(null)

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic
            .getUserName()
            .then(setName)
            .catch((error) => {
              alert(error.message)
              console.error(error)
            })
        } catch (error) {
          alert(error.message)
          console.error(error)
        }
    }
  }, [name])

  const handleLogout = () => {
    confirm(
      "¿Estás seguro de cerrar sesión?",
      (accepted) => {
        if (accepted) {
          logic.logoutUser()
          navigate("/login")
          onClose()
        }
      },
      "warn"
    )
  }

  const handleFilterClick = (type) => {
    navigate(`/events/${type}`)
    onClose()
  }
  const handleHomeClick = () => {
    navigate("/")
    onClose()
  }

  if (!isOpen) return null
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 left-0 h-full w-64 bg-secondary text-white shadow-lg z-20 flex flex-col justify-between p-4">
        {name && (
          <div className=" text-center">
            <h3 className="text-lg font-semibold text-white">¡Hola, {name}!</h3>
          </div>
        )}

        <div className="space-y-4">
          <button className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full">
            Mi Perfil
          </button>
          <button
            onClick={handleHomeClick}
            className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full"
          >
            Todos los eventos
          </button>
          <button
            onClick={() => handleFilterClick("Sociales")}
            className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full"
          >
            Sociales
          </button>
          <button
            onClick={() => handleFilterClick("Escuelas de baile")}
            className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full"
          >
            Escuelas de baile
          </button>
          <button
            onClick={() => handleFilterClick("Clases particulares")}
            className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full"
          >
            Clases particulares
          </button>
          <button
            onClick={() => handleFilterClick("Congresos")}
            className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full"
          >
            Congresos
          </button>
          <button
            onClick={() => handleFilterClick("Masterclases")}
            className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full"
          >
            Masterclases
          </button>
        </div>
        <div>
          <button
            className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  )
}
