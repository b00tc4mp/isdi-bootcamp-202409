import Logo from '../assets/logo.png'
import WelcomeBg from '../assets/welcome-bg.png'

export default function Welcome(props) {
  console.debug('Welcome -> render')

  const handleLoginClick = (event) => {
    event.preventDefault()
    props.onLoginClick()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-gray-800">
      {/* Logo or Icon */}
      <div className="mb-6">
        <img src={Logo} alt="Loving Hands Logo" className="h-12" />
      </div>

      {/* Welcome Message */}
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Loving Hands</h1>
      <p className="text-center text-lg px-4 mb-6">
        Loving Hands is here to connect caregivers and elders, making care accessible and easy.
      </p>

      {/* Login Button */}
      <a
        onClick={handleLoginClick}
        href="/login" // Replace with your login route
        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
      >
        Go to Login
      </a>
    </div>
  )
}
