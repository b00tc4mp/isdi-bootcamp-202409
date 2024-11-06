//import { Component } from 'react'
import { useState } from 'react'

import Input from './Input'


export default function PasswordInput({ id }) {
    const [status, setStatus] = useState('🫣')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '🫣' ? '🥹' : '🫣')
        setType(type === 'password' ? 'text' : 'password')
    }

    console.log('Entramos en el passwordInput Render')

    return <div style={{ display: 'flex' }}>
        <Input type={type} id={id} />
        <span
            style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
            onClick={handleToggleClick}
        >{status}</span>
    </div>
}