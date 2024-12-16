export default function Footer({ onHomeClick, onNewAdClick, onDarkModeClick, onSettingsClick }) {
  console.debug('Footer -> Render')

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#fbdfc7] shadow-lg z-20">
      <div className="flex justify-around items-center py-3">
        <button
          className="flex flex-col items-center justify-center text-black hover:text-[#D1AFA0] transition duration-200"
          onClick={onHomeClick}
        >
          <span className="text-sm font-medium">HOME</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-black hover:text-[#D1AFA0] transition duration-200"
          onClick={onNewAdClick}
        >
          <span className="text-sm font-medium">NEW POST</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-black hover:text-[#D1AFA0] transition duration-200"
          onClick={onDarkModeClick}
        >
          <span className="text-sm font-medium">DARK MODE</span>
        </button>

        <button onClick={onSettingsClick}>⚙️</button>
      </div>
    </footer>
  )
}
