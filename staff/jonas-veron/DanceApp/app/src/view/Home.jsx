import logic from "../logic"
import { useState, useEffect } from "react"

import { Event } from "../view/Components/functional/index.js"

export default function Home() {
  console.log("Home -> render")
  const [name, setName] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic
            .getUserName()
            .then(setName)
            .catch((error) => {
              alert(error.message)
              console.error
            })
        } catch (error) {
          alert(error.message)

          console.error(error)
        }
    }
  }, [name])

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
      <h1 className="pt-16 text-center text-cyan-50"></h1>

      <div className="items-center text-center pb-16">
        {events.map((event) => (
          <Event key={event.id} event={event} refreshEvents={refreshEvents} />
        ))}
      </div>
    </>
  )
}
