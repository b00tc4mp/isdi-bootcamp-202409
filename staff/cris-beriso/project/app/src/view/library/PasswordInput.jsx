import { useState } from 'react'

import Input from './Input'


export default function PasswordInput({ id, placeholder }) {
  const [status, setStatus] = useState('🙈')
  const [type, setType] = useState('password')

  const handleToggleClick = () => {
    setStatus(status === '🙈' ? '🐵' : '🙈'),
      setType(type === 'password' ? 'text' : 'password')
  }

  return <div style={{ display: 'flex' }}>
    <Input type={type} id={id} className="PasswordInput relative" placeholder={placeholder} />
    <span
      className="PasswordSpan absolute right-[7rem]"
      onClick={handleToggleClick}
    >{status}</span>
  </div>
}

