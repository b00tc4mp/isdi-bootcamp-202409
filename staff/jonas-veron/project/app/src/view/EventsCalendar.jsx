import { useState, useEffect } from "react"
import Calendar from "react-calendar"
import logic from "../logic"
import "react-calendar/dist/Calendar.css"
import "./CalendaryStyles.css"
import useContext from "./useContext"
import useLiterals from "./useLiterals"

export default function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([])

  const { alert } = useContext()
  const literals = useLiterals()

  useEffect(() => {
    try {
      logic
        .getEvents()
        .then(setEvents)
        .catch((error) => {
          alert(literals(error.message))
          console.error(error)
        })
    } catch (error) {
      alert(literals(error.message))
      console.error(error)
    }
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const filteredEvents = events.filter(
    (event) =>
      new Date(event.date).toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="flex flex-col items-center min-hscreen">
      <h2 className="text-white text-2xl font-bold mb-8 pt-16">
        Calendario de Eventos
      </h2>
      <div className="text-white p-2">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const isEventDay = events.some((event) => {
                return (
                  new Date(event.date).toDateString() === date.toDateString()
                )
              })
              return isEventDay ? "bg-accentgreen text-white" : null
            }
          }}
          className="custom-calendar"
        />
      </div>

      <div className="mt-8 w-full max-w-lg rounded-lg p-6">
        <h2 className="text-white text-xl mb-4 text-center">
          {filteredEvents.length > 0
            ? `Eventos para el ${selectedDate.toLocaleDateString()}`
            : "No hay eventos para esta fecha."}
        </h2>
        <ul>
          {filteredEvents.map((event) => (
            <li key={event.id} className="text-white p-4 rounded-lg mb-4">
              <img src={event.images[0]} alt="" className="rounded-xl" />
              <p>
                Si no sabes como llegar
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.coordinates[0]},${event.location.coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline text-lg ml-1"
                >
                  haz click aquí
                </a>
              </p>
              <p className="pb-6">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
