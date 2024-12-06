import React, { useEffect, useState } from 'react'
import { Button } from './library'

import logic from '../../../api/logic'

const HomeDiver = () => {
    const [userName, setUserName] = useState('')

    useEffect(() => {
        try {
        logic.getUserName()
        .then(name => { setUserName(name)})
            } catch (error) {
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50 overflow-hidden">

            <h1 className="text-xl font-bold text-center mb-5">Hi, diver 🤿 {userName}</h1>
            <div className="flex flex-col justify-center items-center space-y-4">
                <Button onClick={() => handlePersonalInformation('personal-info')}>Personal Information</Button>

                <Button onClick={() => handlePersonalDocument('docs-and-insurance')}>Docs & Insurance</Button>

                <Button onClick={() => handleNewDive('log-new-dive')}>Log a New Dive</Button>

                <Button onClick={() => handleLogBook('check-logbook')}>Dive's History</Button>
            </div>
        </div>
    )
}

export default HomeDiver