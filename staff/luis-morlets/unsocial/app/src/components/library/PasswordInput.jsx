import { useState } from 'react'
import Input from './Input'

export default function PasswordInput({ id }) {
    const [type, setType] = useState('password')
    const [status, setStatus] = useState('https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/hide-password.png')

    const handleToggleClick = () => {
        setStatus(status === 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/hide-password.png'
            ? 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png'
            : 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/hide-password.png')
        setType(type === 'password'
            ? 'text'
            : 'password')
    }

    return <div>
        <Input type={type} id={id} required={true} />
        <img className="icon" src={status}
            onClick={handleToggleClick}
        />
    </div>
}