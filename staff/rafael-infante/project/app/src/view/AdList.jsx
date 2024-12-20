import Ad from './components/functional/Ad'
import logic from '../logic/index.js'
import { useState, useEffect } from 'react'
import useContext from './useContext.js'

export default function AdList() {
  console.debug('AdList - > render')
  const [ads, setAds] = useState([])
  const [filteredAds, setFilteredAds] = useState([])
  const { alert } = useContext()

  useEffect(() => {
    try {
      logic
        .getAds()
        .then((ads) => {
          setAds(ads)
          filterAds(ads) // Filtrar después de obtener los anuncios
        })
        .catch((error) => {
          alert(error.message)
          console.error(error)
        })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }, [])

  const refreshAds = () => {
    try {
      logic
        .getAds()
        .then((ads) => {
          setAds(ads)
          filterAds(ads) // Filtrar después de refrescar los anuncios
        })
        .catch((error) => {
          alert(error.message)
          console.error(error)
        })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const filterAds = (ads) => {
    const userRole = logic.getUserRole() // Obtener el rol del usuario logeado
    const filtered = ads.filter((ad) =>
      userRole === 'caregiver' ? ad.author.role === 'elder' : ad.author.role === 'caregiver'
    )
    setFilteredAds(filtered)
  }

  const handleDeleted = refreshAds
  const handleReviewAdded = refreshAds
  const handleReviewRemoved = refreshAds
  const handleFavorited = refreshAds

  return (
    <div className="flex flex-col min-h-screen pt-12 mb-12 bg-gray-50 text-gray-800">
      {/* Ad List */}
      <div className="flex-grow flex flex-col items-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-0 mt-6">
          {filteredAds.length > 0 ? (
            <div className="space-y-4">
              {filteredAds.map((ad) => (
                <Ad
                  key={ad.id}
                  ad={ad}
                  onDeleted={handleDeleted}
                  onReviewAdded={handleReviewAdded}
                  onReviewRemoved={handleReviewRemoved}
                  onFavorite={handleFavorited}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No ads available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
