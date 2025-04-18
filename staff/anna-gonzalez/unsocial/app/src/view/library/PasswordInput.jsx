import { useState } from 'react'

import Input from './Input'

export default function PasswordInput({ id }) {
    const [status, setStatus] = useState('🔐')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '🔐' ? '🔓' : '🔐')
        setType(type === 'password' ? 'text' : 'password')
    }
    //console.log('PasswordInput -> render')

    return <div className="relative">
        <Input className="pr-6" type={type} id={id} />
        <span className="absolute mr-2 mt-1 cursor-pointer"
            onClick={handleToggleClick}
        >{status}</span>
    </div>
}