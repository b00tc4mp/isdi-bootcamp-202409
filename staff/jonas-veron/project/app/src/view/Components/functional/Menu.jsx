import logic from "./../../../logic"
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import useContext from "../../useContext"
import { configIcon, logoutIcon } from "../../../assets/index.js"
import { ButtonMenu } from "./../library"

export default function Menu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { alert, confirm } = useContext()
  const [name, setName] = useState(null)

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic
            .getUserName()
            .then(setName)
            .catch((error) => {
              alert(error.message)
              console.error(error)
            })
        } catch (error) {
          alert(error.message)
          console.error(error)
        }
    }
  }, [name])

  const handleLogout = () => {
    confirm(
      "¿Estás seguro de cerrar sesión?",
      (accepted) => {
        if (accepted) {
          logic.logoutUser()
          navigate("/login")
          onClose()
        }
      },
      "warn"
    )
  }

  const handleFilterClick = (type) => {
    navigate(`/events/${type}`)
    onClose()
  }
  const handleHomeClick = () => {
    navigate("/")
    onClose()
  }

  const handleSettingsClick = () => {
    navigate("/settings")
    onClose()
  }

  if (!isOpen) return null
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 left-0 h-full w-64 bg-secondary text-white shadow-lg z-20 flex flex-col justify-between p-2">
        {name && (
          <div className=" text-center mb-4">
            <h3 className="text-lg font-semibold text-white">¡Hola, {name}!</h3>
          </div>
        )}

        <div className="space-y-3">
          <ButtonMenu onClick={handleHomeClick}>Todos los eventos</ButtonMenu>
          <ButtonMenu onClick={() => handleFilterClick("Sociales")}>
            Sociales
          </ButtonMenu>
          <ButtonMenu onClick={() => handleFilterClick("Escuelas de baile")}>
            Escuelas de baile
          </ButtonMenu>
          <ButtonMenu onClick={() => handleFilterClick("Clases particulares")}>
            Clases particulares
          </ButtonMenu>
          <ButtonMenu onClick={() => handleFilterClick("Congresos")}>
            Congresos
          </ButtonMenu>
          <ButtonMenu onClick={() => handleFilterClick("Masterclases")}>
            Masterclases
          </ButtonMenu>
        </div>
        <div className="mt-6">
          <div className="flex">
            <ButtonMenu onClick={handleSettingsClick}>
              <img src={configIcon} alt="Configuración" className="w-6 h-6" />
              Configuración
            </ButtonMenu>
          </div>
          <div className="flex mt-4">
            <ButtonMenu onClick={handleLogout}>
              <img src={logoutIcon} alt="Cerrar sesión" className="w-5 h-5" />
              Cerrar Sesión
            </ButtonMenu>
          </div>
        </div>
      </div>
    </>
  )
}
