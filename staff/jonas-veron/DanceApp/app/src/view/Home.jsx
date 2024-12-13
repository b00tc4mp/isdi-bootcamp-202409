import logic from "../logic"
import { useState, useEffect } from "react"
import useContext from "./useContext"

import { Event } from "../view/Components/functional/index.js"

export default function Home() {
  console.log("Home -> render")
  const [events, setEvents] = useState([])

  const { alert } = useContext()

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
    try {
      refreshEvents()
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }, [])

  return (
    <>
      <h1 className="pt-20 text-center font-semibold text-cyan-50 text-4xl pb-20 font-body">
        EVENTOS
      </h1>

      <div className="items-center text-center pb-16">
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            refreshEvents={refreshEvents}
            onLiked={refreshEvents}
            onDeleted={refreshEvents}
          />
        ))}
      </div>
    </>
  )
}
