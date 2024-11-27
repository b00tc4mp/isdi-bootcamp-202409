import { useLocation } from "react-router-dom"
import burguer from "./../../assets/burguer.png"
import create from "./../../assets/create.png"
import DanceAppLogo from "./../../assets/DanceAppLogo.png"

export default function Header() {
  console.log("Header -> render")
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 w-full bg-primary  h-16 flex items-center justify-between px-4 shadow-lg z-10">
      <div className="flex items-center gap-4">
        <button className="text-white">
          <img src={burguer} alt="Menu" className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center gap-6">
        <button className="h-6 w-6">
          <img src={create} />
        </button>
        <p className="w-24 h-24 pt-8">
          <img src={DanceAppLogo} />
        </p>
      </div>
    </header>
  )
}
