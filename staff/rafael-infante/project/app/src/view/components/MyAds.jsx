import Ad from './functional/Ad.jsx'
import logic from '../../logic/index.js'
import { useState, useEffect } from 'react'
import useContext from '../useContext.js'

export default function MyAds() {
  console.debug('MyAds -> render')
  const [myAds, setMyAds] = useState([])

  const { alert } = useContext()

  const refreshMyAds = () => {
    try {
      logic
        .getAds()
        .then((ads) => {
          const userId = logic.getUserId() // Obtener el ID del usuario logueado
          const filteredAds = ads.filter((ad) => ad.author.id === userId) // Filtrar los anuncios
          setMyAds(filteredAds)
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

  const handleDeleted = refreshMyAds

  useEffect(() => {
    refreshMyAds()
  }, [])

  return (
    <div className="pt-16 flex flex-col min-h-screen mb-12 bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-[#47c8e5] text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold text-center">My Ads</h1>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center px-4 py-6">
        {myAds.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <p className="text-gray-500">You don't have any Ads</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            {myAds.map((ad) => (
              <Ad key={ad.id} ad={ad} refreshAds={refreshMyAds} onDeleted={handleDeleted} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
