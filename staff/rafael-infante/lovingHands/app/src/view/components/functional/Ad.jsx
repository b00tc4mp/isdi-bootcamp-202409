import { useState } from 'react'
import logic from '../../../logic'
import Reviews from './Reviews'
import Location from './Location'
import { getElapsedTime } from '../../../utils'
import favoriteIcon from '../../../assets/favorite.png'
import unFavoriteIcon from '../../../assets/unfavorite.png'

export default function Ad({ ad, onFavorited, onDeleted, onReviewAdded, onReviewRemoved }) {
  const [view, setView] = useState(null)
  const [isFavorite, setIsFavorite] = useState(ad.isFavorite)

  const { id, author, files, text, date, reviews } = ad

  const handleDeleteClick = () => {
    if (confirm('Delete ad')) {
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
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white font-semibold text-lg opacity-0 hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-4">
        <p className="text-gray-800 font-semibold text-lg mb-2">{text}</p>
        <p className="text-sm text-gray-500">Posted by: {author.name}</p>
        <time className="text-xs text-gray-400 block mb-2">{getElapsedTime(date)} ago</time>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReviewsClick}
              className="text-blue-500 hover:underline text-sm flex items-center gap-1"
            >
              📝 {reviews} reviews
            </button>
            <span className="text-gray-400">|</span>
            <a
              onClick={handleLocationClick}
              className="text-blue-500 hover:underline text-sm flex items-center gap-1 cursor-pointer"
            >
              📍location
            </a>
          </div>

          {author.id === logic.getUserId() && (
            <button onClick={handleDeleteClick} className="text-red-500 hover:underline text-sm">
              🗑️ Delete
            </button>
          )}
          <button onClick={handleFavoriteClick}>
            <img
              className="h-6 w-6"
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
              <Location center={ad.location.coordinates} ads={[ad]} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
