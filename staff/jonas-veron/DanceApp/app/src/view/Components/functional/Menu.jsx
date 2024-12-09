import logic from "./../../../logic"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import EventMap from "./EventMap"

export default function Menu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [view, setView] = useState(null)

  const handleLogout = () => {
    window.confirm("¿Estás seguro de cerrar sesión?")
    logic.logoutUser()
    navigate("/login")
    onClose()
  }

  const refreshEvents = () => {
    try {
      logic
        .getEvents()
        .then(setEvents)
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  console.log(events)

  const handleNearEvents = () => {
    if (!view) {
      refreshEvents()
    }
    setView(view ? null : "near-events")
  }
  const handleCloseMap = () => {
    setView(null)
  }

  if (!isOpen) return null
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 left-0 h-full w-64 bg-secondary text-white shadow-lg z-20 flex flex-col justify-between p-4">
        <div className="space-y-4">
          <button className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full">
            Mi Perfil
          </button>
          <button className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full">
            Sociales
          </button>
          <button className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full">
            Escuelas de baile
          </button>
          <button className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full">
            Clases particulares
          </button>
          <button className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full">
            Congresos
          </button>
          <button className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full">
            Marterclases
          </button>
          <button
            className="bg-accentpink hover:bg-tertiary text-white py-2 px-4 rounded text-left w-full"
            onClick={handleNearEvents}
          >
            Cerca de mí
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

      {view === "near-events" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-3/4 max-w-2xl">
            <button
              onClick={handleCloseMap}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4 text-center text-gray-700">
                Ubicación del evento
              </h2>
              <EventMap center={[41.3870154, 2.1700471]} events={events} />
              {/* <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates[0]},${location.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-xl"
              >
                ¿Cómo llegar?
              </a> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
