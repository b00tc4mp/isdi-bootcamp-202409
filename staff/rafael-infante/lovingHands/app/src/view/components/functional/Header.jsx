import Logo from '../../../assets/logo.png'
import logic from '../../../logic'

export default function Header({ onLoggedOut }) {
  console.log('Header -> render')

  const handleLogout = (event) => {
    if (confirm('Logout?')) {
      event.preventDefault()
      logic.logoutUser()

      onLoggedOut()
    }
  }

  return (
    <header className="flex items-center justify-between w-full bg-[#fbdfc7] px-4 py-3 shadow-md">
      <div className="flex items-center">
        <img src={Logo} alt="Loving Hands Logo" className="h-10" />
      </div>
      <button
        onClick={handleLogout}
        className="bg-[#47c8e5] text-white py-1 px-4 rounded-lg shadow hover:bg-[#F56132] transition-all duration-200 text-sm font-medium"
      >
        Logout
      </button>
    </header>
  )
}
