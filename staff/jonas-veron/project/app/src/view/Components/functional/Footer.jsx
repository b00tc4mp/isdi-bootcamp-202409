import { useNavigate } from "react-router-dom"
import logic from "../../../logic"
import useContext from "../../useContext"

import {
  homeIcon,
  calendarIcon,
  starIcon,
  createIcon,
  locationIcon,
} from "../../../assets/index.js"

export default function Footer() {
  const { alert, confirm } = useContext()

  const navigate = useNavigate()

  const onNearbyEventsClick = () => {
    navigate("/nearbyevents")
  }

  const onNewEventClick = () => {
    if (!logic.isUserPermissionWrite()) {
      alert("Aún no tienes permiso para publicar.")
      return
    }
    navigate("/createEvent")
  }
  const handleHomeClick = () => {
    navigate("/")
  }
  const onFavoritClick = () => {
    navigate("/favorites")
  }
  const onCalendarClick = () => {
    navigate("/calendar")
  }

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full text-white flex justify-around items-center h-[6vh] shadow-lg bg-gradient-to-t from-primary to-secondary border-t border-white/20">
        <button
          className="flex flex-col items-center"
          onClick={handleHomeClick}
        >
          <img
            src={homeIcon}
            alt="Icono de home"
            title="HOME"
            className="w-6 h-6  "
          />
        </button>
        <button
          className="flex flex-col items-center"
          onClick={onNearbyEventsClick}
        >
          <img src={locationIcon} alt="Mapa" title="MAPA" className="w-8 h-8" />
        </button>

        {logic.isUserRoleOrganizer() && (
          <button
            className="flex flex-col items-center"
            onClick={onNewEventClick}
          >
            <img
              src={createIcon}
              alt="Crear evento"
              title="CREAR EVENTO"
              className="w-10 h-"
            />
          </button>
        )}

        <button className="flex flex-col items-center">
          <img
            src={calendarIcon}
            alt="calendario"
            title="CALENDARIO"
            className="w-6 h-6"
            onClick={onCalendarClick}
          />
        </button>
        <button className="flex flex-col items-center">
          <img
            src={starIcon}
            alt="favoritos"
            title="FAVORITOS"
            className="w-8 h-8"
            onClick={onFavoritClick}
          />
        </button>
      </footer>
    </>
  )
}
