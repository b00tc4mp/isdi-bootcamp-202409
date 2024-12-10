import logic from '../logic'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Location from './components/functional/Location'

export default function Home() {
  const [name, setName] = useState(null)
  const [ads, setAds] = useState([])
  const [view, setView] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    console.log('Header -> render componentDidMount & componentWillReceiveProps')
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
        .then(setAds)
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
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

  console.log('Home -> render')

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        {/* Main Content */}
        <div className="flex flex-col items-center px-4 flex-grow">
          <div className="w-full max-w-md text-center mt-6 mb-6">
            <h1 className="text-3xl font-bold text-[#2b2b2b]">Welcome {name}!</h1>
            <p className="text-gray-600 mt-2">
              We're glad to have you here. Explore the app to find elders in need of assistance or offer your help by
              posting your service.
            </p>
          </div>

          {/* Actions Section */}
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4 cursor-pointer">
              <a
                onClick={handleFindAdsClick}
                className="flex flex-col items-center justify-center bg-[#FFC9B0] text-[#E84D67] rounded-lg p-4 shadow hover:bg-[#F56132] hover:text-white transition duration-200"
              >
                Find Ads
              </a>
              <a
                href="/offer-help"
                className="flex flex-col items-center justify-center bg-[#47c8e5] text-white rounded-lg p-4 shadow hover:bg-[#E84D67] hover:text-white transition duration-200"
              >
                Offer Help
              </a>
              <a
                onClick={handleNearAds}
                className="flex flex-col items-center justify-center bg-[#FFC9B0] text-[#E84D67] rounded-lg p-4 shadow hover:bg-[#F56132] hover:text-white transition duration-200"
              >
                Ads near me
              </a>
              <a
                onClick={handleFavoritesClick}
                className="flex flex-col items-center justify-center bg-[#D1AFA0] text-white rounded-lg p-4 shadow hover:bg-[#E84D67] hover:text-white transition duration-200"
              >
                Favorite Ads
              </a>
            </div>
          </div>
        </div>
      </div>
      {view === 'near-ads' && userLocation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-3/4 max-w-2xl">
            <button onClick={handleCloseMap} className="absolute top-3 right-3 text-gray-500 hover:text-black">
              ✖
            </button>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4 text-center text-gray-700">Ads near me</h2>
              <Location center={userLocation} ads={ads} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
