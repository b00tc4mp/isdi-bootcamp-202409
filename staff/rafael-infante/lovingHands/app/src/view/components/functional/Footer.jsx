import { FaHome, FaPlus, FaMoon, FaCog } from 'react-icons/fa'

export default function Footer({ onHomeClick, onNewAdClick, onDarkModeClick, onSettingsClick }) {
  console.debug('Footer -> Render')

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#fbdfc7] shadow-lg z-20">
      <div className="flex justify-around items-center py-3">
        {/* Botón de Home */}
        <button
          className="flex items-center justify-center text-[#eb3b58] hover:text-[#D1AFA0] transition duration-200"
          onClick={onHomeClick}
        >
          <FaHome className="text-2xl" />
        </button>

        {/* Botón de New Post */}
        <button
          className="flex items-center justify-center text-[#eb3b58] hover:text-[#D1AFA0] transition duration-200"
          onClick={onNewAdClick}
        >
          <FaPlus className="text-2xl" />
        </button>

        {/* Botón de Dark Mode */}
        <button
          className="flex items-center justify-center text-[#eb3b58] hover:text-[#D1AFA0] transition duration-200"
          onClick={onDarkModeClick}
        >
          <FaMoon className="text-2xl" />
        </button>

        {/* Botón de Settings */}
        <button
          className="flex items-center justify-center text-[#eb3b58] hover:text-[#D1AFA0] transition duration-200"
          onClick={onSettingsClick}
        >
          <FaCog className="text-2xl" />
        </button>
      </div>
    </footer>
  )
}
