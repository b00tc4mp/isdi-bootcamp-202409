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
  }, [])

  useEffect(() => {
    try {
      logic
        .getEvents()
        .then(setEvents)
        .catch((error) => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }, [])
  return (
    <>
      <h1 className="pt-16 text-center text-cyan-50">Bienvenido {name}!!!</h1>

      <div className="items-center text-center ">
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </>
  )
}
