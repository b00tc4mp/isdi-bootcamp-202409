import Logo from '../../../assets/logo.png'
import logic from '../../../logic'
import useContext from '../../useContext.js'

export default function Header({ onLoggedOut }) {
  console.debug('Header -> render')
  const { confirm } = useContext()

  const handleLogout = (event) => {
    confirm(
      'Logout?',
      (accepted) => {
        if (accepted) {
          event.preventDefault()
          logic.logoutUser()

          onLoggedOut()
        }
      },
      'warn'
    )
  }

  return (
    <header className="fixed flex items-center justify-between w-full bg-[#fbdfc7] px-4 py-3 shadow-md z-20">
      <div className="flex items-center">
        <img src={Logo} alt="Loving Hands Logo" className="h-8" />
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
