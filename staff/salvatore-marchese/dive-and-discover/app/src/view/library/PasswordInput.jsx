import { useState } from 'react';
import Input from './Input';

export default function PasswordInput({ id }) {
    const [status, setStatus] = useState('🔒');
    const [type, setType] = useState('password');

    const handleToggleClick = () => {
        setStatus(status === '🔒' ? '🔓' : '🔒');
        setType(type === 'password' ? 'text' : 'password');
    };

    return (
        <div className="relative flex items-center w-full">
            <Input type={type} id={id} className="pr-10" /> {/* Add padding on the right to make room for the icon */}
            <span
                onClick={handleToggleClick}
                className="absolute right-2 cursor-pointer text-xl"
            >
                {status}
            </span>
        </div>
    );
}