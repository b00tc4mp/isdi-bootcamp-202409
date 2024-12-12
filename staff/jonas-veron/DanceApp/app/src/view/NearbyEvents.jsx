import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import logic from "../logic"
import { calculateDistance } from "../utils/index.js"
import { EventMap } from "../view/Components/functional/index.js"
import useContext from "./useContext"

export default function NearbyEvents() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [center, setCenter] = useState([41.3851, 2.1734])
  const [eventType, setEventType] = useState("")
  const [radius, setRadius] = useState(5)

  //   const location = useLocation()
  const { alert } = useContext()
  const navigate = useNavigate()

  useEffect(() => {
    const userConsent = window.confirm("¿Quieres compartir tu ubicaciòn?")

    if (userConsent) {
      logic
        .getUserLocation()
        .then((location) => {
          setCenter(location)
          refreshEvents()
        })
        .catch((error) => {
          alert(error.message)
          console.error(error)
        })
    } else {
      refreshEvents()
    }
  }, [])

  const refreshEvents = () => {
    try {
      logic
        .getEvents()
        .then((events) => {
          setEvents(events)
          setFilteredEvents(events)
        })
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const handleCloseMap = () => {
    navigate("/")
  }

  const applyFilters = () => {
    let filtered = events

    if (eventType !== "") {
      filtered = filtered.filter((event) => event.eventType === eventType)
    }

    filtered = filtered.filter((event) => {
      const distance = calculateDistance(center, event.location.coordinates)
      return distance <= radius
    })

    setFilteredEvents(filtered)
  }

  const handleFilterChange = (event) => {
    setEventType(event.target.value)
  }

  const handleRadiusChange = (event) => {
    const selectedRadius = Number(event.target.value)
    setRadius(selectedRadius)
  }

  useEffect(() => {
    applyFilters()
  }, [eventType, radius, events])

  return (
    <div className="fixed inset-0 flex flex-col text-white pt-20">
      <div className="flex flex-col items-center py-4 px-6">
        <div className="w-full max-w-md mb-6">
          <label htmlFor="radius" className="block mb-2 font-semibold">
            Filtro por radio (km):
          </label>
          <input
            type="range"
            id="radius"
            min="1"
            max="200"
            value={radius}
            onChange={handleRadiusChange}
            className="w-full accent-white"
          />
          <p className="text-sm mt-2">Radio actual: {radius} km</p>
        </div>

        <div className="w-full max-w-md mb-6">
          <label htmlFor="eventType" className="block mb-2 font-semibold">
            Filtrar por tipo de evento:
          </label>
          <select
            id="eventType"
            value={eventType}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-tertiary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todos</option>
            <option value="Sociales">Sociales</option>
            <option value="Clases particulares">Clases particulares</option>
            <option value="Congresos">Congresos</option>
            <option value="Masterclases">Masterclases</option>
          </select>
        </div>

        <div className="w-full max-w-4xl">
          <h2 className="text-center py-4 text-xl font-bold bg-secondary text-white">
            Mapa de Eventos
          </h2>
          <EventMap center={center} events={filteredEvents} />
        </div>
      </div>
    </div>
  )
}
