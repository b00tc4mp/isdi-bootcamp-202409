import { useState, useEffect } from 'react'
import logic from '../logic'

export default function Home() {
  const [name, setName] = useState(null)

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
  }, [])

  console.log('Home -> render')

  return (
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
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/caregivers"
              className="flex flex-col items-center justify-center bg-[#FFC9B0] text-[#E84D67] rounded-lg p-4 shadow hover:bg-[#F56132] hover:text-white transition duration-200"
            >
              Find Elders Posts
            </a>
            <a
              href="/offer-help"
              className="flex flex-col items-center justify-center bg-[#47c8e5] text-white rounded-lg p-4 shadow hover:bg-[#E84D67] hover:text-white transition duration-200"
            >
              Offer Help
            </a>
            <a
              href="/profile"
              className="flex flex-col items-center justify-center bg-[#FFC9B0] text-[#E84D67] rounded-lg p-4 shadow hover:bg-[#F56132] hover:text-white transition duration-200"
            >
              My Ads
            </a>
            <a
              href="/messages"
              className="flex flex-col items-center justify-center bg-[#D1AFA0] text-white rounded-lg p-4 shadow hover:bg-[#E84D67] hover:text-white transition duration-200"
            >
              Saved posts
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
