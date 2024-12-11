import logic from "../logic"
import { useState, useEffect } from "react"

import { Event } from "../view/Components/functional/index.js"

export default function Home() {
  console.log("Home -> render")
  const [name, setName] = useState(null)
  const [events, setEvents] = useState([])

  const refreshEvents = () => {
    logic
      .getEvents()
      .then(setEvents)
      .catch((error) => {
        alert(error.message)
        console.error(error)
      })
  }

  useEffect(() => {
    refreshEvents()
  }, [])

  return (
    <>
      <h1 className="pt-20 text-center text-cyan-50 text-4xl pb-20 font-body">
        EVENTOS
      </h1>

      <div className="items-center text-center pb-16">
        {events.map((event) => (
          <Event key={event.id} event={event} refreshEvents={refreshEvents} />
        ))}
      </div>
    </>
  )
}
