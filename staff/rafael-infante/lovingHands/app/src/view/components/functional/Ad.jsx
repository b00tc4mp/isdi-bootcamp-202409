import { useState } from 'react'
import logic from '../../../logic'
import Reviews from './Reviews'
import Location from './Location'
import { getElapsedTime } from '../../../utils'
import favoriteIcon from '../../../assets/favorite.png'
import unFavoriteIcon from '../../../assets/unfavorite.png'
import whatsappIcon from '../../../assets/whatsapp.png'
import useContext from '../../useContext.js'

export default function Ad({ ad, onFavorited, onDeleted, onReviewAdded, onReviewRemoved }) {
  console.debug('Ad -> render')

  const [view, setView] = useState(null)
  const [isFavorite, setIsFavorite] = useState(ad.isFavorite)
  const { alert, confirm } = useContext()

  const { id, author, files, text, date, reviews, averageRating } = ad

  const handleDeleteClick = () => {
    confirm(
      'Delete post?',
      (accepted) => {
        if (accepted) {
          try {
            logic
              .deleteAd(id)
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
      'warn'
    )
  }

  const handleFavoriteClick = async () => {
    try {
      setIsFavorite(!isFavorite)
      await logic.toggleFavorite(id)
      onFavorited
    } catch (error) {
      setIsFavorite(!isFavorite)
      alert(error.message)
      console.error(error)
    }
  }

  const handleReviewsClick = () => setView(view ? null : 'reviews')
  const handleLocationClick = () => setView(view ? null : 'location')
  const handleCloseMap = () => setView(null)

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img src={files[0]} alt="Ad Image" className="w-full h-48 object-cover" />
        {/* Información del autor y calificación */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-1.5 py-0.5 rounded-md">
          <p className="text-sm font-semibold">{author.name}</p>
          <div className="flex items-center">
            {Array.from({ length: Math.round(averageRating) }, (_, i) => (
              <span key={i} className="text-yellow-400 text-sm">
                ⭐
              </span>
            ))}
          </div>
        </div>

        <a
          href={`https://wa.me/${author.telephone}?text=Hi%20${author.name},%20I%20saw%20your%20ad%20and%20I%27m%20interested!`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 p-2 rounded-full shadow-lg bg-green-500 hover:bg-green-600 transition duration-200 z-10"
        >
          <img src={whatsappIcon} alt="Contact via WhatsApp" className="w-8 h-8" />
        </a>

        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white font-semibold text-lg opacity-0 hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-4">
        <p className="text-gray-800 font-semibold text-lg">{text}</p>
        <time className="text-sm text-gray-500 block mb-2">Posted {getElapsedTime(date)} ago</time>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReviewsClick}
              className="text-blue-500 hover:underline text-sm flex items-center gap-1"
            >
              📝 {reviews} Reviews
            </button>
            <span className="text-gray-400">|</span>
            <a
              onClick={handleLocationClick}
              className="text-blue-500 hover:underline text-sm flex items-center gap-1 cursor-pointer"
            >
              📍Location
            </a>
          </div>

          {author.id === logic.getUserId() && (
            <button onClick={handleDeleteClick} className="text-red-500 hover:underline text-sm">
              🗑️ Delete
            </button>
          )}
          <button onClick={handleFavoriteClick}>
            <img
              className="h-7 w-7"
              src={isFavorite ? favoriteIcon : unFavoriteIcon}
              alt={isFavorite ? 'Unfavorite' : 'favorite'}
            />
          </button>
        </div>
      </div>

      {/* Vista de Reviews */}
      {view === 'reviews' && (
        <div className="bg-gray-100 border-t border-gray-300 p-4">
          <Reviews adId={id} onAdded={onReviewAdded} onRemoved={onReviewRemoved} />
        </div>
      )}
      {/* Vista de Location */}

      {view === 'location' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-3/4 max-w-2xl">
            <button onClick={handleCloseMap} className="absolute top-3 right-3 text-gray-500 hover:text-black">
              ✖
            </button>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4 text-center text-gray-700">Location of {ad.author.name}</h2>
              <Location center={ad.location.coordinates} ads={[ad]} showUserMarker={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
