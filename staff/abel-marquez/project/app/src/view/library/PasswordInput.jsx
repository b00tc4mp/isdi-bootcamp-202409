import { useState } from 'react'

import Input from './Input'

export default function PasswordInput() {
    const [status, setStatus] = useState('😊');
    const [type, setType] = useState('password');

    const handleToggleClick = () => {
        setStatus(status === '😊' ? '🙃' : '😊');
        setType(type === 'password' ? 'text' : 'password');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input type={type} className="w-full px-4 py-2 border border-gray-300 rounded" />
            <span
                style={{
                    cursor: 'pointer',
                    marginLeft: '10px',
                }}
                onClick={handleToggleClick}
            >
                {status}
            </span>
        </div>
    );
}
