import { useState } from 'react'
import logic from '../../logic'
import Reviews from './Reviews'
import { getElapsedTime } from '../../utils'

export default function Ad({ ad, onDeleted, onReviewAdded, onReviewRemoved }) {
  const [view, setView] = useState(null)

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

  const handleReviewsClick = () => setView(view ? null : 'reviews')

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      {/* Imagen destacada */}
      <div className="relative">
        <img src={files[0]} alt="Ad Image" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white font-semibold text-lg opacity-0 hover:opacity-100 transition-opacity">
          Click to View
        </div>
      </div>

      {/* Contenido del anuncio */}
      <div className="p-4">
        <p className="text-gray-800 font-semibold text-lg mb-2">{text}</p>
        <p className="text-sm text-gray-500">Posted by: {author.name}</p>
        <time className="text-xs text-gray-400 block mb-2">{getElapsedTime(date)} ago</time>

        {/* Opciones de interacción */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReviewsClick}
              className="text-blue-500 hover:underline text-sm flex items-center gap-1"
            >
              📝 {reviews} reviews
            </button>
            <span className="text-gray-400">|</span>
            <a className="text-gray-400 cursor-pointer">📍</a>
          </div>

          {author.id === logic.getUserId() && (
            <button onClick={handleDeleteClick} className="text-red-500 hover:underline text-sm">
              🗑️ Delete
            </button>
          )}
        </div>
      </div>

      {/* Vista de Reviews */}
      {view === 'reviews' && (
        <div className="bg-gray-100 border-t border-gray-300 p-4">
          <Reviews adId={id} onAdded={onReviewAdded} onRemoved={onReviewRemoved} />
        </div>
      )}
    </div>
  )
}
