import { useState } from 'react'

import Input from './Input.jsx'

export default function PasswordInput({ id }) {
    const [status, setStatus] = useState('🙈')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '🙈' ? '😏' : '🙈')
        setType(type === 'password' ? 'text' : 'password')
    }

    console.log('PasswordInput -> render')

    return <div style={{ display: 'flex' }}>
        <Input type={type} id={id} />
        <span
            className='cursor-pointer absolute right-5'
            onClick={handleToggleClick}
        >{status}</span>
    </div>
}