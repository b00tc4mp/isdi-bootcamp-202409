import logic from '../logic'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Location from './components/functional/Location'
import useContext from './useContext'
import { FaSearch, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'

export default function Home() {
  const [name, setName] = useState(null)
  const [ads, setAds] = useState([])
  const [filteredAds, setFilteredAds] = useState([])
  const [view, setView] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const { alert } = useContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic
            .getUserName()
            .then(setName)
            .catch((error) => {
              alert(error.message)
              console.error(error)
            })
        } catch (error) {
          alert(error.message)
          console.error(error)
        }
    } else setName(null)
  }, [name])

  const handleFindAdsClick = () => navigate('/ads')
  const handleFavoritesClick = () => navigate('/favorites')

  const refreshAds = () => {
    try {
      logic
        .getAds()
        .then((ads) => {
          setAds(ads)
          filterAds(ads)
        })
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const filterAds = (ads) => {
    const userRole = logic.getUserRole()
    const filtered = ads.filter((ad) =>
      userRole === 'caregiver' ? ad.author.role === 'elder' : ad.author.role === 'caregiver'
    )
    setFilteredAds(filtered)
  }

  const handleNearAds = () => {
    const userConsent = window.confirm('Do you want to share your location to see ads near you?')

    if (!userConsent) {
      alert('You need to share your location to use this feature.')
      return
    }

    logic
      .getUserLocation()
      .then((location) => {
        setUserLocation([location.lat, location.lon])
        refreshAds()
        setView('near-ads')
      })
      .catch((error) => {
        console.error('Error getting user location:', error.message)
        alert('Unable to fetch your location. Please enable location services.')
      })
  }

  const handleCloseMap = () => setView(null)

  return (
    <>
      <div className="pt-14 flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <div className="flex flex-col items-center px-4 flex-grow">
          <div className="w-full max-w-md text-center mt-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2b2b2b] text-center">Hello {name}!</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2 text-center">
              We're glad to have you here. Explore the app to find ads, locate nearby offers, or view your favorites.
            </p>
          </div>

          {/* Quick Actions Section */}
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 mb-4">
            <div className="grid grid-rows-3 gap-4 cursor-pointer">
              <button
                onClick={handleFindAdsClick}
                className="flex flex-col items-center justify-center bg-[#FFC9B0] text-[#E84D67] rounded-lg p-4 shadow hover:bg-[#F56132] hover:text-white transition duration-200"
              >
                <FaSearch className="text-2xl mb-2" />
                Find Ads
              </button>
              <button
                onClick={handleNearAds}
                className="flex flex-col items-center justify-center bg-[#47c8e5] text-white rounded-lg p-4 shadow hover:bg-[#E84D67] hover:text-white transition duration-200"
              >
                <FaMapMarkerAlt className="text-2xl mb-2" />
                Ads Near Me
              </button>
              <button
                onClick={handleFavoritesClick}
                className="flex flex-col items-center justify-center bg-[#D1AFA0] text-white rounded-lg p-4 shadow hover:bg-[#E84D67] hover:text-white transition duration-200"
              >
                <FaHeart className="text-2xl mb-2" />
                Favorite Ads
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map View for Nearby Ads */}
      {view === 'near-ads' && userLocation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full m-1">
            <button onClick={handleCloseMap} className="absolute top-3 right-3 text-gray-500 hover:text-black">
              ✖
            </button>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4 text-center text-gray-700">Ads Near Me</h2>
              <Location center={userLocation} ads={filteredAds} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
