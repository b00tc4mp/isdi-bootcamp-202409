import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import logic from "../../../logic"
import { EventMap } from "./index.js"

import {
  homeIcon,
  calendarIcon,
  starIcon,
  createIcon,
  locationIcon,
} from "../../../assets/index.js"

export default function Footer() {
  console.log("Footer -> render")
  const [events, setEvents] = useState([])
  const [view, setView] = useState(null)
  const [center, setCenter] = useState([41.3851, 2.1734])

  const location = useLocation()
  const navigate = useNavigate()

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
            setView("near-events")
          })
          .catch((error) => {
            console.error(error.message)
            alert(error.message)
          })
      } else {
        setView("near-events")
        refreshEvents()
      }
      setView(view ? null : "near-events")
    }
  }
  const handleCloseMap = () => {
    setView(null)
  }

  const onNewEventClick = () => {
    navigate("/createEvent")
  }
  const handleHomeClick = () => {
    navigate("/")
  }
  const onFavoritClick = () => {
    navigate("/favorites")
  }

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full text-white flex justify-around items-center h-[6vh] shadow-lg bg-gradient-to-t from-primary to-secondary border-t border-white/20">
        <button
          className="flex flex-col items-center"
          onClick={handleHomeClick}
        >
          <img
            src={homeIcon}
            alt="Icono de home"
            title="HOME"
            className="w-6 h-6  "
          />
        </button>
        <button
          className="flex flex-col items-center"
          onClick={handleNearEvents}
        >
          <img
            src={locationIcon}
            alt="Buscar"
            title="BUSCAR"
            className="w-8 h-8"
          />
        </button>

        <button
          className="flex flex-col items-center"
          onClick={onNewEventClick}
        >
          <img
            src={createIcon}
            alt="Crear evento"
            title="CREAR EVENTO"
            className="w-10 h-"
          />
        </button>

        <button className="flex flex-col items-center">
          <img
            src={calendarIcon}
            alt="calendario"
            title="CALENDARIO"
            className="w-6 h-6"
          />
        </button>
        <button className="flex flex-col items-center">
          <img
            src={starIcon}
            alt="favoritos"
            title="FAVORITOS"
            className="w-8 h-8"
            onClick={onFavoritClick}
          />
        </button>
      </footer>

      {view === "near-events" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl">
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
