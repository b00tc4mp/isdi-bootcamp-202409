import logic from "./../../../logic"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import EventMap from "./EventMap"

export default function Menu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [view, setView] = useState(null)
  const [center, setCenter] = useState([41.3851, 2.1734])

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

  const handleNearEvents = () => {
    if (!view) {
      const userConsent = window.confirm("¿Quieres compartir tu ubicaciòn?")

      if (userConsent) {
        logic
          .getUserLocation()
          .then((location) => {
            setCenter(location)
            refreshEvents()
          })
          .catch((error) => {
            console.error(error.message)
            alert(error.message)
          })
      } else {
        setCenter([41.3851, 2.1734])
        refreshEvents()
      }
      setView(view ? null : "near-events")
    }
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
              <EventMap center={center} events={events} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
