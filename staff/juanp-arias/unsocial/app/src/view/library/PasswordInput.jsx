import { useState } from 'react'

export default function PasswordInput({ id, placeholder }) {
    const [status, setStatus] = useState('😊')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😊' ? '🫥' : '😊')
        setType(type === 'password' ? 'text' : 'password')
    }
    return <div>
        <input className='Input text-black w-full pl-1 bg-orange-100 h-8' type={type} id={id} placeholder={placeholder} />
        <span className="emoji pr-[5.4rem] pt-[0.3rem]"
            style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
            onClick={handleToggleClick}
        >{status}</span>
    </div >
}
