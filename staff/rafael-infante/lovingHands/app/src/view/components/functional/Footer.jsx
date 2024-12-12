export default function Footer({ onHomeClick, onNewAdClick, onProfileClick }) {
  console.log('Footer -> Render')

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#fbdfc7] shadow-lg">
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
          onClick={onProfileClick}
        >
          <span className="text-sm font-medium">DARK MODE</span>
        </button>
      </div>
    </footer>
  )
}
