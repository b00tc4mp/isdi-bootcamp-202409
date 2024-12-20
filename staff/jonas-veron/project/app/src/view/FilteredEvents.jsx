import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import logic from "../logic"
import { Event } from "../view/Components/functional/index.js"
import useContext from "./useContext"
import useLiterals from "./useLiterals"

export default function FilteredEvents() {
  const [events, setEvents] = useState([])

  const { type } = useParams()
  const { alert } = useContext()
  const literals = useLiterals()

  const fetchFilteredEvents = () => {
    try {
      logic
        .getEvents()
        .then((allEvents) => {
          const filtered = allEvents.filter((event) => event.type === type)
          setEvents(filtered)
        })
        .catch((error) => {
          alert(literals(error.message))
          console.error(error)
        })
    } catch (error) {
      alert(literals(error.message))
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFilteredEvents()
  }, [type])

  return (
    <div className="items-center text-center pb-16">
      <h1 className="pt-20 text-center text-cyan-50 font-semibold text-2xl pb-8 font-body">
        {type.toUpperCase()}
      </h1>
      {events.length === 0 ? (
        <div className="empty-favorites">
          <p className="text-white pt-16 text-lg">
            No hay eventos disponibles.
          </p>
        </div>
      ) : (
        <div className="items-center text-center pb-16">
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              refreshEvents={fetchFilteredEvents}
              onLiked={fetchFilteredEvents}
              onDeleted={fetchFilteredEvents}
            />
          ))}
        </div>
      )}
    </div>
  )
}
