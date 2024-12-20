import { useState } from 'react'
import passwordClosed from '../../../assets/eye-closed.png'
import passwordOpened from '../../../assets/eye-opened.png'

export default function PasswordInput({ id, placeholder }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const type = isPasswordVisible ? 'text' : 'password'

  const handleToggleClick = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className="w-full relative">
      <input
        type={type}
        id={id}
        placeholder={placeholder || 'Password'}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
      <img
        src={isPasswordVisible ? passwordOpened : passwordClosed}
        onClick={handleToggleClick}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
      />
    </div>
  )
}
