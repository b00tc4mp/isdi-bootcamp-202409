import { useLocation } from "react-router-dom"
import homeIcon from "../../assets/homeIcon.svg"
import searchIcon from "../../assets/searchIcon.svg"
import calendarIcon from "../../assets/calendarIcon.svg"
import starIcon from "../../assets/starIcon.svg"
import create from "./../../assets/create.svg"

export default function Footer() {
  console.log("Footer -> render")

  const location = useLocation()

  return (
    <footer className="fixed bottom-0 left-0 w-full text-white flex justify-around items-center h-16 shadow-lg bg-gradient-to-t from-primary to-secondary to-pimary border-t border-white/20">
      <button className="flex flex-col items-center">
        <img
          src={homeIcon}
          alt="Icono de home"
          title="HOME"
          className="w-6 h-6  "
        />
      </button>
      <button className="flex flex-col items-center">
        <img src={searchIcon} alt="Buscar" title="BUSCAR" className="w-6 h-6" />
      </button>
      <button className="flex flex-col items-center">
        <img
          src={create}
          alt="Crear evento"
          title="CREAR EVENTO"
          className="w-10 h-"
        />
      </button>
      <button className="flex flex-col items-center">
        <img
          src={calendarIcon}
          alt="calendario"
          title="CALENDARIO"
          className="w-6 h-6"
        />
      </button>
      <button className="flex flex-col items-center">
        <img
          src={starIcon}
          alt="favoritos"
          title="FAVORITOS"
          className="w-8 h-8"
        />
      </button>
    </footer>
  )
}

//"bg-gradient-to-t from-gray-800 to-black text-white border-t border-white/10"
