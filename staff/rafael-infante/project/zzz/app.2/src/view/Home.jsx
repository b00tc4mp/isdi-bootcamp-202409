import { useState, useEffect } from 'react'
import Logo from '../assets/logo.png'
import logic from '../logic'

export default function Home({ onLoggedOut }) {
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

  const handleLogout = (event) => {
    if (confirm('Logout?')) {
      event.preventDefault()
      logic.logoutUser()

      onLoggedOut()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between w-full bg-[#fbdfc7] px-4 py-3 shadow-md">
        <div className="flex items-center">
          <img src={Logo} alt="Loving Hands Logo" className="h-10" />
        </div>
        <button
          onClick={handleLogout} // Call logout function
          className="bg-[#47c8e5] text-white py-1 px-4 rounded-lg shadow hover:bg-[#F56132] transition-all duration-200 text-sm font-medium"
        >
          Logout
        </button>
      </header>

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
              Profile
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

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#fbdfc7] shadow-lg">
        <div className="flex justify-around items-center py-3">
          <button
            className="flex flex-col items-center justify-center text-black hover:text-[#D1AFA0] transition duration-200"
            onClick={() => console.log('Go to Home')}
          >
            <span className="text-sm font-medium">HOME</span>
          </button>
          <button
            className="flex flex-col items-center justify-center text-black hover:text-[#D1AFA0] transition duration-200"
            onClick={() => console.log('New Post')}
          >
            <span className="text-sm font-medium">NEW POST</span>
          </button>
          <button
            className="flex flex-col items-center justify-center text-black hover:text-[#D1AFA0] transition duration-200"
            onClick={() => console.log('Profile')}
          >
            <span className="text-sm font-medium">PROFILE</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
