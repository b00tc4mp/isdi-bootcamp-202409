import { useState } from "react"
import {
  ChangeEmail,
  ChangePassword,
  ChangeProfilePicture,
} from "./Components/functional/index.js"
import { ButtonConfig } from "../view/Components/library"

export default function Settings() {
  const [view, setView] = useState("none")

  const handleViewChange = (viewName) => setView(viewName)

  return (
    <div className="pt-8 pb-12 flex justify-center items-center">
      <div className="w-full max-w-lg p-12 rounded-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-6 font-body">
          CONFIGURACIÓN
        </h1>

        <div className="space-y-4 mb-6">
          <ButtonConfig
            onClick={() => handleViewChange("password")}
            className={`w-full py-3 px-4 rounded-2xl flex items-center gap-2 justify-center ${
              view === "password"
                ? "bg-accentgreen text-white"
                : "bg-tertiary text-white"
            }`}
          >
            Cambiar Contraseña
          </ButtonConfig>
          <ButtonConfig
            onClick={() => handleViewChange("photo")}
            className={`w-full py-3 px-4 rounded-2xl flex items-center gap-2 justify-center ${
              view === "photo"
                ? "bg-accentgreen text-white"
                : "bg-tertiary text-white"
            }`}
          >
            Cambiar Foto de Perfil
          </ButtonConfig>
          <ButtonConfig
            onClick={() => handleViewChange("email")}
            className={`w-full py-3 px-4 rounded-2xl flex items-center gap-2 justify-center ${
              view === "email"
                ? "bg-accentgreen text-white"
                : "bg-tertiary text-white"
            }`}
          >
            {" "}
            Cambiar E-mail
          </ButtonConfig>
        </div>

        {view === "password" && <ChangePassword />}
        {view === "photo" && <ChangeProfilePicture />}
        {view === "email" && <ChangeEmail />}
        {view === "none" && (
          <p className="text-center text-gray-400">
            Selecciona una opción para comenzar
          </p>
        )}
      </div>
    </div>
  )
}
