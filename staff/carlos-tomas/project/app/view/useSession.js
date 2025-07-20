import { singletonHook } from 'react-singleton-hook'
import { useState, useEffect } from 'react'
import logic from '../logic'

const useSessionBase = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoggingVeterinary, setIsLoggingVeterinary] = useState(false)

    const checkUserStatus = async () => {
        try {
            const loggedIn = await logic.isUserLoggedIn()
            setIsLoggedIn(loggedIn)
        } catch (error) {
            console.error('Error validating user login', error)
        }
    }

    const checkLoggingVeterinary = async () => {
        try {
            const isLoggingVeterinary = await logic.isLoggingVet()
            setIsLoggingVeterinary(isLoggingVeterinary)
        } catch (error) {
            console.error('Error validating user role', error)
        }
    }

    useEffect(() => {
        checkUserStatus()
        checkLoggingVeterinary()
    }, [])

    return { isLoggedIn, setIsLoggedIn, isLoggingVeterinary, setIsLoggingVeterinary }
}

// Usamos singletonHook para crear una única instancia del hook
const defaultSession = {
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    isLoggingVeterinary: false,
    setIsLoggingVeterinary: () => { },
}

const useSession = singletonHook(defaultSession, useSessionBase)

export default useSession
