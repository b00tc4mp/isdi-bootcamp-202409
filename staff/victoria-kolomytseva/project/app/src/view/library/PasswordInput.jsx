import { useState } from 'react'

import Input from './Input'

export default function PasswordInput({ id, placeholder }) {

    const [type, setType] = useState('password')


    return <div style={{ display: 'flex' }}>
        <Input type={type} id={id} placeholder={placeholder} />
    </div>
}