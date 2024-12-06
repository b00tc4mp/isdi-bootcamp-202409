import Ad from './components/Ad'
import logic from '../logic/index.js'
import { useState, useEffect } from 'react'

export default function AdList() {
  console.log('AdList - > render')
  const [ads, setAds] = useState([])

  useEffect(() => {
    try {
      logic
        .getAds()
        .then(setAds)
        .catch((error) => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }, [])

  const handleDeleted = () => {
    try {
      logic
        .getAds()
        .then(setAds)
        .catch((error) => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleReviewAdded = () => {
    try {
      logic
        .getAds()
        .then(setAds)
        .catch((error) => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleReviewRemoved = () => {
    try {
      logic
        .getAds()
        .then(setAds)
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
    <div className="flex flex-col min-h-screen mb-12 bg-gray-50 text-gray-800">
      {/* Ad List */}
      <div className="flex-grow flex flex-col items-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-0 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">All Ads</h2>

          {ads.length > 0 ? (
            <div className="space-y-4">
              {ads.map((ad) => (
                <Ad
                  key={ad.id}
                  ad={ad}
                  onDeleted={handleDeleted}
                  onReviewAdded={handleReviewAdded}
                  onReviewRemoved={handleReviewRemoved}
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
