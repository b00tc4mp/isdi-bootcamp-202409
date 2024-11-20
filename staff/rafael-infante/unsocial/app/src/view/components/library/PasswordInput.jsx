import { useState } from "react"
import Input from "./Input"

export default function PasswordInput({ id }) {
  const [className, setClassname] = useState('far fa-eye')
  const [type, setType] = useState('password')

  const handleIconClick = () => {
    setClassname(className === 'far fa-eye' ? 'far fa-eye-slash' : 'far fa-eye')
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div className="password-container">
      <Input id={id} type={type} placeholder="Enter your password" required />
      <i className={className}
        id="icon"
        onClick={handleIconClick}></i>
    </div>
  )
}