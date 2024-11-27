import { useState } from "react"
import passwordClosed from "./../../../assets/password-closed.png"
import passwordOpened from "../../../assets/password-opened.png"

export default function PasswordInput({ id, placeholder }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const type = isPasswordVisible ? "text" : "password"

  const handleToggleClick = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className="w-full relative">
      <input
        type={type}
        id={id}
        placeholder={placeholder || "Contraseña"}
        className="w-64 h-10 p-2 text-white bg-transparent border-2 border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300 placeholder-gray-400 hover:bg-pink-500 hover:bg-opacity-10"
      />
      <img
        src={isPasswordVisible ? passwordOpened : passwordClosed}
        onClick={handleToggleClick}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
      />
    </div>
  )
}
