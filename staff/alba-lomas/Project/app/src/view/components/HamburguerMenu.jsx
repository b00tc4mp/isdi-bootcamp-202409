


import React, { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

const NAV_LINKS = [
  { key: "Inicio", href: "/", label: "Inicio" },
  { key: "gastos", href: "/expenses", label: "gastos" },
  //{ key: "Proveedores", href: "/Proveedores", label: "Proveedores" },
  //{ key: "Usuarios", href: "/Usuarios", label: "Usuarios" },
  //{ key: "Cambiar contraseña", href: "/CambiarContraseña", label: "Cambiar contraseña" },
]

export const HamburguerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = (href) => {
    navigate(href)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Bars3Icon className="h-8 w-8 text-black cursor-pointer" onClick={toggleMenu} />

      <div
        className={`fixed top-0 left-0 h-auto w-full bg-sky-700 bg-opacity-80 shadow-lg rounded-lg transform
          ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
        style={{ maxHeight: "calc(100vh - 20px)" }}
      >
        <div className="flex justify-end p-4">
          <XMarkIcon className="h-8 w-8 text-white cursor-pointer" onClick={toggleMenu} />
        </div>

        <ul className="flex flex-col items-center justify-center text-white space-y-6 mt-10">
          {NAV_LINKS.map((link) => (
            <button key={link.key} className="text-lg hover:text-gray-300 transition" onClick={() => handleNavigation(link.href)}>
              {link.label}
            </button>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-30 z-40" onClick={toggleMenu} />
      )}
    </div>
  )
}

