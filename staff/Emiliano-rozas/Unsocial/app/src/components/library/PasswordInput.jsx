import { useState } from 'react'

import Input from './Input'

import './PasswordInput.css'

export default function PasswordInput({ id }) {

    const [status, setStatus] = useState('😌')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😌' ? '😳' : '😌')
        setType(type === 'password' ? 'text' : 'password')
    }

    console.log('PasswordInput -> render')

    return <div className="h-[35px] flex bg-white border border-[#fcf9f9] rounded-md items-baseline mb-2 w-[95%]  " >
        <Input type={type} id={id} />
        <span className="cursor-pointer relative right-2"
            onClick={handleToggleClick}
        >{status}</span>
    </div >
}


