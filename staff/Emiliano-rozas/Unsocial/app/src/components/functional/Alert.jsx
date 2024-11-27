import React from 'react'
import { Button } from '../library'

export default function Alert({ message, level = 'error', onAccepted }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[yellow] ' : 'border-[green]'

    const handleAcceptClick = () => onAccepted()

    return (
        <div className="fixed h-full w-full top-0 flex items-center justify-center">
            <div className={`min-w-[20rem] min-h-[10rem] bg-white ${borderColor} border-[1rem] flex flex-col items-center justify-center p-2 gap-2 content-center max-w-96 mt-20 bord rounded-lg`}>
                < p className='text-[14px] leading-[1.4] text-[#555]'> {message}</p >
                <Button onClick={handleAcceptClick}>Accept</Button>
            </div>
        </div >
    )
}

