import { useState } from "react"
import logic from "../../../logic"
import { getElapsedTime } from "../../../utils"
import {
  likeIcon,
  likedIcon,
  commentIcon,
  shareIcon,
  locationIcon,
  starIcon,
  deleteIcon,
  isFavoriteIcon,
} from "./../../../assets/index.js"
import useContext from "../../useContext"
import { Comments } from "./index.js"
import EventMap from "./EventMap.jsx"

export default function Event({ event, refreshEvents, onLiked, onDeleted }) {
  const { alert, confirm } = useContext()

  const {
    id,
    author,
    images,
    type,
    text,
    date,
    createdAt,
    location,
    likedByUser,
    favoriteByUser,
    likes,
    comments,
  } = event

  const [view, setView] = useState(null)
  const [imageProfileOpen, setImageProfileOpen] = useState(false)

  const handleLikeClick = () => {
    try {
      logic
        .toggleLikeEvent(id)
        .then(onLiked)
        .catch((error) => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleDeleteClick = () => {
    confirm(
      "Borrar evento ?",
      (accepted) => {
        if (accepted) {
          try {
            logic
              .deleteEvent(id)
              .then(onDeleted)
              .catch((error) => {
                alert(error.message)

                console.error(error)
              })
          } catch (error) {
            alert(error.message)

            console.error(error)
          }
        }
      },
      "warn"
    )
  }
  const handleCommentsClick = () => setView(view ? null : "comments")
  const handleLocationClick = () => setView(view ? null : "location")

  const handleShareEvent = (event) => {
    if (navigator.share) {
      navigator.share({
        text: `¡Echa un vistazo a este evento: ${event.text}!`,
        url: `http://'ponerAppAcaDespues'/events/${event.id}`,
      })
    } else {
      console.error(error)
      alert(error.message)
    }
  }

  const handleFavoritesClick = () => {
    try {
      logic
        .toggleFavoriteEvent(id)
        .then(refreshEvents)
        .catch((error) => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleImageProfileClick = () => {
    setImageProfileOpen(true)
  }

  const handleCloseImageProfile = () => {
    setImageProfileOpen(false)
  }

  return (
    <article className="bg-transparent text-white shadow-md rounded-lg p-1 mb-6 max-w-xl mx-auto relative">
      {/* Contenedor para autor, dirección e ícono de cerrar */}
      <div className="flex justify-between items-center mb-2">
        {/* Contenedor para inicial, nombre y dirección */}
        <div className="flex items-center">
          {/* Foto del autor */}
          <div className="flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full bg-accentpink flex items-center justify-center text-white font-bold overflow-hidden"
              onClick={handleImageProfileClick}
            >
              {!author.profilePicture ? (
                <span>{author.name[0].toUpperCase()}</span>
              ) : (
                <img
                  src={author.profilePicture}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          {/* Nombre del autor y dirección */}
          <div className="ml-3 flex flex-col items-start">
            <h4 className="font-bold text-white">{author.name}</h4>
            <p className="text-xs italic text-gray-300 leading-none">
              {location.province}
            </p>
          </div>
        </div>

        {/* Ícono de eliminar */}
        {author.id === logic.getUserId() && (
          <img
            src={deleteIcon}
            alt="Delete event"
            className="w-6 h-6 cursor-pointer"
            onClick={handleDeleteClick}
          />
        )}
      </div>

      {imageProfileOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "
          onClick={handleCloseImageProfile}
        >
          <div className="relative">
            <img
              src={author.profilePicture}
              alt="Vista ampliada"
              rounded-lg
              className="w-96 h-96 object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Imagen y botones */}
      <div className="mb-2">
        <img
          src={images[0]}
          className="w-full h-auto rounded-lg object-cover"
        />
        <div className="flex items-center justify-between mt-0.5 mr-3 ml-3">
          <div className="flex space-x-8">
            <div className="flex">
              <img
                src={likedByUser ? likedIcon : likeIcon}
                alt="Like"
                className="w-6 h-6 cursor-pointer"
                onClick={handleLikeClick}
              />
              <p className="ml-2">{likes}</p>
            </div>
            <div className="flex">
              <img
                src={commentIcon}
                alt="Comment"
                className="w-6 h-6 cursor-pointer"
                onClick={handleCommentsClick}
              />
              <p className="ml-2">{comments}</p>
            </div>
            <img
              src={shareIcon}
              alt="Share"
              className="w-6 h-6 cursor-pointer"
              onClick={() => handleShareEvent(event)}
            />
            <img
              src={locationIcon}
              alt="Location"
              className="w-6 h-6 cursor-pointer"
              onClick={handleLocationClick}
            />
          </div>
          <img
            src={favoriteByUser ? isFavoriteIcon : starIcon}
            alt="Favorite"
            className="w-6 h-6 cursor-pointer"
            onClick={handleFavoritesClick}
          />
        </div>

        <time className="flex justify-end text-xs">{getElapsedTime(date)}</time>
      </div>
      <p className="text-white mb-4 text-start">
        <b>{author.name} </b>
        {text}
      </p>
      <time>{getElapsedTime(createdAt)}</time>

      {view === "location" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-5/6 max-w-2xl">
            <button
              onClick={handleLocationClick}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4 text-center text-gray-700">
                Ubicación del evento
              </h2>
              <EventMap
                center={event.location.coordinates}
                events={[event]}
                showUserMarker={false}
              />
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates[0]},${location.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline-none text-lg font-bold"
              >
                ¿Cómo llegar?
              </a>
            </div>
          </div>
        </div>
      )}

      {view === "comments" && (
        <Comments
          eventId={id}
          refreshEvents={refreshEvents}
          onClose={handleCommentsClick}
        />
      )}
    </article>
  )
}
