import { useState } from "react"
import logic from "../../../logic"
import { getElapsedTime } from "../../../util"
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

import { Comments } from "./index.js"
import EventMap from "./EventMap.jsx"

export default function Event({ event, refreshEvents }) {
  console.log("Post -> render")

  const {
    id,
    author,
    files,
    eventType,
    text,
    eventDate,
    date,
    location,
    likedByUser,
    favoriteByUser,
    likes,
    comments,
  } = event
  console.log(event)

  const [view, setView] = useState(null)

  const handleLikeClick = () => {
    try {
      logic
        .toggleLikeEvent(id)
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

  const handleDeleteClick = () => {
    if (window.confirm("Borrar evento ?")) {
      try {
        logic
          .deleteEvent(id)
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
  }
  const handleCommentsClick = () => setView(view ? null : "comments")
  const handleLocationClick = () => setView(view ? null : "location")
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

  return (
    <article className="bg-transparent text-white shadow-md rounded-lg p-1 mb-6 max-w-xl mx-auto relative">
      {/* Contenedor para autor y dirección */}
      <div className="flex items-start mb-2">
        {/* Inicial del autor */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accentpink flex items-center justify-center text-white font-bold">
            {author.name[0]}
          </div>
        </div>
        {/* Nombre del autor y dirección */}
        <div className="ml-1">
          <h4 className="font-bold text-white">{author.name}</h4>
          <p className="text-xs italic mr-28">{location.province}</p>
        </div>
      </div>

      {/* Ícono de eliminar en la esquina derecha */}
      {author.id === logic.getUserId() && (
        <img
          src={deleteIcon}
          alt="Delete event"
          className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
          onClick={handleDeleteClick}
        />
      )}

      {/* Imagen y botones */}
      <div className="mb-2">
        <img src={files[0]} className="w-full h-auto rounded-lg object-cover" />
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

        <time className="flex justify-end text-xs">
          {getElapsedTime(eventDate)}
        </time>
      </div>
      <p className="text-white mb-4 text-start">
        <b>{author.name} </b>
        {text}
      </p>
      <time>{getElapsedTime(date)}</time>

      {view === "location" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-3/4 max-w-2xl">
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
                coordinates={location.coordinates}
                address={location.address}
              />
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates[0]},${location.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-xl"
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
