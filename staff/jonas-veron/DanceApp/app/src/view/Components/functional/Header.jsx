import { useState } from "react"
import { useLocation } from "react-router-dom"
import burguer from "./../../../assets/burguer.png"
import DanceAppLogo from "./../../../assets/DanceAppLogo.svg"
import { Menu } from "./index.js"

export default function Header() {
  const [isMenuOpen, setMenuIsOpen] = useState(false)
  console.log("Header -> render")
  const location = useLocation()

  const toggleMenu = () => {
    setMenuIsOpen((prevState) => !prevState)
  }
  const closeMenu = () => {
    setMenuIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full h-[6vh] flex items-center justify-between px-4 shadow-lg z-10 bg-gradient-to-b from-primary to-secondary border-b border-white/20">
      <div className="flex items-center gap-4">
        <button className="text-white" onClick={toggleMenu}>
          <img src={burguer} alt="Menu" className="h-[2vh] w-[3vh]" />
        </button>
      </div>
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />

      <div className="flex items-center gap-6">
        <p className="w-[10vh] h-[10vh] pt-[3.5vh]">
          <img src={DanceAppLogo} />
        </p>
      </div>
    </header>
  )
}
