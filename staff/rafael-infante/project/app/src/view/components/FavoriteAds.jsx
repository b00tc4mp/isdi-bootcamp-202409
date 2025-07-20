import Ad from './functional/Ad.jsx'
import logic from '../../logic/index.js'
import { useState, useEffect } from 'react'
import useContext from '../useContext.js'

export default function FavoriteAds() {
  console.debug('Favorites - > render')
  const [favoriteAds, setFavoriteAds] = useState([])

  const { alert } = useContext()

  const refreshFavoriteAds = () => {
    try {
      logic
        .getFavoriteAds()
        .then(setFavoriteAds)
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
    refreshFavoriteAds()
  }, [])

  return (
    <div className="pt-16 flex flex-col min-h-screen mb-12 bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-[#47c8e5] text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold text-center">My Favorites</h1>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center px-4 py-6">
        {favoriteAds.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <p className="text-gray-500">You don't have any favorites</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            {favoriteAds.map((ad) => (
              <Ad key={ad.id} ad={ad} refreshAds={refreshFavoriteAds} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
