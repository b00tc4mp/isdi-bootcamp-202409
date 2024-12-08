import logic from "../logic"
import { useState, useEffect } from "react"
import { Event } from "../view/Components/functional/index.js"

export default function FavoritEvents() {
  console.log("Favorites -> render")
  const [favoriteEvents, setFavoriteEvents] = useState([])

  const refreshFavoriteEvents = () => {
    try {
      logic
        .getFavoriteEvents()
        .then(setFavoriteEvents)
        .catch((error) => {
          alert(error.message)
          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  useEffect(() => {
    refreshFavoriteEvents()
  }, [])

  return (
    <div className="items-center text-center pb-16">
      <h1 className="pt-20 text-white text-4xl"> Mis Favoritos</h1>
      {favoriteEvents.length === 0 ? (
        <div className="empty-favorites">
          <p className="text-white pt-16 text-lg">
            No tienes eventos favoritos aún.
          </p>
        </div>
      ) : (
        <div className="items-center text-center pb-16">
          {favoriteEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              refreshEvents={refreshFavoriteEvents}
            />
          ))}
        </div>
      )}
    </div>
  )
}
