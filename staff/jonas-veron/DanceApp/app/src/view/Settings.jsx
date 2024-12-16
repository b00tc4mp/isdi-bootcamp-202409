import { useState } from "react"
import {
  ChangeEmail,
  ChangePassword,
  ChangePhoto,
} from "./Components/functional/index.js"

export default function Settings() {
  const [view, setView] = useState("none")

  const handleViewChange = (viewName) => setView(viewName)

  return (
    <div className="pt-16 pb-12 flex justify-center items-center">
      <div className="w-full max-w-lg p-12 rounded-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-6 font-body">
          Configuración
        </h1>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => handleViewChange("password")}
            className={`w-full py-3 px-4 rounded-2xl flex items-center gap-2 justify-center ${
              view === "password"
                ? "bg-secondary text-white"
                : "bg-tertiary text-white"
            }`}
          >
            Cambiar Contraseña
          </button>
          <button
            onClick={() => handleViewChange("photo")}
            className={`w-full py-3 px-4 rounded-2xl flex items-center gap-2 justify-center ${
              view === "photo"
                ? "bg-secondary text-white"
                : "bg-tertiary text-white"
            }`}
          >
            Cambiar Foto de Perfil
          </button>
          <button
            onClick={() => handleViewChange("email")}
            className={`w-full py-3 px-4 rounded-2xl flex items-center gap-2 justify-center ${
              view === "email"
                ? "bg-secondary text-white"
                : "bg-tertiary text-white"
            }`}
          >
            {" "}
            Cambiar E-mail
          </button>
        </div>

        {view === "password" && <ChangePassword />}
        {view === "photo" && <ChangePhoto />}
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
