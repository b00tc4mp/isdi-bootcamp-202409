import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import logic from "../logic"
import { Event } from "../view/Components/functional/index.js"
import useContext from "./useContext"

export default function FilteredEvents() {
  const { type } = useParams()
  const [events, setEvents] = useState([])

  const { alert } = useContext

  useEffect(() => {
    try {
      logic
        .getEvents()
        .then((allEvents) => {
          const filtered = allEvents.filter((event) => event.type === type)
          setEvents(filtered)
        })
        .catch((error) => {
          alert(error.message)
          console.error(error)
        })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }, [type])
  console.log(events)

  return (
    <div className="items-center text-center pb-16">
      <h1 className="pt-20 text-center text-cyan-50 font-semibold text-4xl pb-20 font-body">
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
            <Event key={event.id} event={event} refreshEvents={() => {}} />
          ))}
        </div>
      )}
      <div className="items-center text-center pb-16">
        {events.map((event) => (
          <Event key={event.id} event={event} refreshEvents={() => {}} />
        ))}
      </div>
    </div>
  )
}
