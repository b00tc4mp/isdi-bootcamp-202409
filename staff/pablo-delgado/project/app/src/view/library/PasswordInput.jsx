import { useState } from 'react'
import Input from './Input'
import { OpenedEyeIcon, ClosedEyeIcon } from '../icons'

export default function PasswordInput({ id }) {
    const [status, setStatus] = useState(<ClosedEyeIcon />)
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === (<ClosedEyeIcon />) ? (<OpenedEyeIcon />) : (<ClosedEyeIcon />))
        setType(type === 'password' ? 'text' : 'password')
    }

    return (
        <div className="relative w-full">
            <Input type={type} id={id} className="w-full pr-10" /> {/* Aseguramos que haya espacio a la derecha */}
            <span 
                style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={handleToggleClick}
            >
                {status}
            </span>
        </div>
    )
}
