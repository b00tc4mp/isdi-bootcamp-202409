import { useState } from 'react'

import Input from './Input'

import './PasswordInput.css'

export default function PasswordInput({ id }) {

    const [status, setStatus] = useState('😌')
    const { type, setType } = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😌' ? '😳' : '😌')
        setType(type === 'password' ? 'text' : 'password')
    }

    console.log('PasswordInput -> render')

    return <div className='passwordInput'>
        <Input type={type} id={id} />
        <span className='carita'
            onClick={handleToggleClick}
        >{status}</span>
    </div >
}


