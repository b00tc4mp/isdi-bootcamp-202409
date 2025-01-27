


import { useState } from "react"

import Input from "./Input"

export default function PasswordInput({ id }) {
    const [status, setStatus] = useState('😌')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😌' ? '👀' : '😌')
        setType(type === 'password' ? 'text' : 'password')
    }

    return <div style={{ display: 'flex' }}>
        <Input type={type} id={id} />
        <span className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
}