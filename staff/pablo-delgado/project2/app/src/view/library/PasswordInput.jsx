import { useState } from 'react'

export default function PasswordInput({ id }) {
    const [status, setStatus] = useState('😌')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😌' ? '😳' : '😌')
        setType(type === 'password' ? 'text' : 'password')
    }

    return (
        <div className="relative w-[300px]">
            <input
                type={type}
                id={id}
                className="w-full box-border border-[var(--color)] border-2 dark:text-black"
            />
            <span
                onClick={handleToggleClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer select-none text-xl"
            >
                {status}
            </span>
        </div>
    )
}
