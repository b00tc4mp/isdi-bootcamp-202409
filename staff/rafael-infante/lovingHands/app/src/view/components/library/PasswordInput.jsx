import { useState } from 'react'

export default function PasswordInput({ id }) {
  const [status, setStatus] = useState('😑')
  const [type, setType] = useState('password')

  const handleToggleClick = () => {
    setStatus(status === '😑' ? '😳' : '😑')
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div style={{ display: 'flex' }}>
      <input type={type} id={id} />
      <span style={{ cursor: 'pointer', position: 'absolute', right: '10px' }} onClick={handleToggleClick}>
        {status}
      </span>
    </div>
  )
}

//TODO apply styles with tailwind
