import { useState } from 'react'

import Input from './Input'

export default function PasswordInput({id}) {
    const[status, setStatus] = useState('😌')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😌' ? '😳' : '😌')
        setType(type === 'password' ? 'text' : 'password')
    }
    
        return <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
        <Input type={type} id={id} style={{ paddingRight: '30px', width: '100%' }} />
        <span
            style={{
                position: 'absolute',
                right: '-27px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
            }}
            onClick={handleToggleClick}
        >
            {status}
        </span>
    </div>
    }
