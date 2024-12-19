import logic from "../logic"
import { useState, useEffect } from "react"
import { Event } from "../view/Components/functional/index.js"
import useContext from "./useContext"
import useLiterals from "./useLiterals.js"

export default function FavoritEvents() {
  const [favoriteEvents, setFavoriteEvents] = useState([])

  const { alert } = useContext()
  const literals = useLiterals()

  const refreshFavoriteEvents = () => {
    try {
      logic
        .getFavoriteEvents()
        .then(setFavoriteEvents)
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
    refreshFavoriteEvents()
  }, [])

  return (
    <div className="items-center text-center">
      <h1 className="pt-20 text-white font-semibold text-2xl font-body pb-8">
        {" "}
        MIS FAVORITOS
      </h1>
      {favoriteEvents.length === 0 ? (
        <p className="text-white pt-16 text-lg">
          No tienes eventos favoritos aún.
        </p>
      ) : (
        <div className="items-center text-center pb-16">
          {favoriteEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              refreshEvents={refreshFavoriteEvents}
              onLiked={refreshFavoriteEvents}
              onDeleted={refreshFavoriteEvents}
            />
          ))}
        </div>
      )}
    </div>
  )
}
