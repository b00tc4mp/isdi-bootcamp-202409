import { useState } from 'react'
import './PasswordInput.css'

export default function PasswordInput({ id, placeholder }) {
    const [status, setStatus] = useState('😊')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😊' ? '🫥' : '😊')
        setType(type === 'password' ? 'text' : 'password')
    }
    return <div>
        <input className='Input' type={type} id={id} placeholder={placeholder} />
        <span className="emoji"
            style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
            onClick={handleToggleClick}
        >{status}</span>
    </div >
}
