import { useState } from 'react'

import './PasswordInput.css'
import Input from './Input'


export default function PasswordInput({ id }) {
    const [status, setStatus] = useState('😌')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😌' ? '😳' : '😌')
        setType(type === 'password' ? 'text' : 'password')
    }

    return <div className="test" style={{ display: 'flex' }}>
        <Input type={type} id={id} />
        <span className="spaan"
            style={{}}
            onClick={handleToggleClick}
        >{status}</span>
    </div >
}
