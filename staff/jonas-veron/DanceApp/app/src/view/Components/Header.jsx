import { useLocation } from "react-router-dom"
import burguer from "./../../assets/burguer.png"

export default function Header() {
  console.log("Header -> render")
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 w-full bg-black  h-16 flex items-center px-4 shadow-lg z-10">
      <div className="flex items-center gap-4">
        <button className="text-white">
          <img src={burguer} alt="Menu" className="h-6 w-6" />
        </button>
        <button className="text-white text-sm border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition">
          crear evento(opcional)
        </button>
      </div>
      <div>
        <h1>DanceApp!</h1>
      </div>
    </header>
  )
}
