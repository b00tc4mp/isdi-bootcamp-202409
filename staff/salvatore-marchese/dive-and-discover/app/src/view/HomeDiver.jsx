import React, { useEffect, useState } from 'react'
import { Button } from './library'

import { User } from '../../../dat'

const HomeDiver = () => {
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await User.findById('user-id')
                setUserName(user.name)
            } catch (error) {
                console.error('Failed to fetch user data:', error)
            }
        }
        fetchUserData()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen p-7 bg-gray-50 mt-1">

            <h1 className="text-xl font-bold text-center mb-5">Hi, diver {userName}</h1>
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