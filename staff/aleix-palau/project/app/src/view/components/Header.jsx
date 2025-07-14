import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Settings2, LogOut, ChevronLeft } from 'lucide-react'
import { IconButton } from '../library'
import logic from '../../logic'
import useContext from '../useContext'

const HEADER_TYPES = {
    AUTH: 'auth',
    SETUP: 'setup',
    MAIN: 'main',
    SETTINGS: 'settings'
}

const getHeaderType = (pathname, isLoggedIn) => {
    if (!isLoggedIn)
        return HEADER_TYPES.AUTH
    else if (pathname.includes('/setup/'))
        return HEADER_TYPES.SETUP
    else if (pathname === '/settings')
        return HEADER_TYPES.SETTINGS
    else
        return HEADER_TYPES.MAIN
}

// Helper function to get setup progress
const getSetupProgress = (pathname) => {
    if (pathname.includes('name-dob')) return 33
    if (pathname.includes('gender')) return 66
    if (pathname.includes('artists')) return 100
    return 0
}

export default function Header({ onLoggedOut, onSettingsClick, onBackFromSettings }) {
    const { confirm } = useContext()
    const location = useLocation()
    const userLoggedIn = logic.isUserLoggedIn()

    const [isLoggedIn, setIsLoggedIn] = useState(userLoggedIn)

    // Initialize with the correct header type based on current location and auth
    const [headerType, setHeaderType] = useState(() => getHeaderType(location.pathname, userLoggedIn))

    // Initialize with correct progress if in setup
    const [setupProgress, setSetupProgress] = useState(() => getSetupProgress(location.pathname))

    useEffect(() => {
        setIsLoggedIn(userLoggedIn)
    }, [location.pathname])

    // Determine which header to show based on current route and auth status
    useEffect(() => {
        const path = location.pathname
        const newHeaderType = getHeaderType(path, userLoggedIn)

        setHeaderType(newHeaderType)

        if (newHeaderType === HEADER_TYPES.SETUP) {
            setSetupProgress(getSetupProgress(path))
        }
    }, [location.pathname, isLoggedIn])

    const handleSettings = () => {
        if (onSettingsClick) onSettingsClick()
    }

    const handleBackFromSettings = () => {
        if (onBackFromSettings) onBackFromSettings()
    }

    const handleLogout = () => {
        confirm(null, confirmed => {
            if (confirmed) {
                logic.logoutUser()
                onLoggedOut()
            }
        }, 'warn', 'Log out?')
    }

    // Auth Header
    const renderAuthHeader = () => (
        <div className="flex justify-center items-center w-full">
            <h1 className="font-bold text-2xl text-center text-darkest-blue select-none">heartbeat</h1>
        </div>
    )

    // Setup Header
    const renderSetupHeader = () => (
        <div className="w-full px-2">
            <div className="w-full flex flex-col items-center">
                <div className="w-full bg-light-blue/50 rounded-full h-3">
                    <div className="bg-dark-blue h-3 rounded-full transition-all duration-700" style={{ width: `${setupProgress}%` }}></div>
                </div>
            </div>
        </div>
    )

    // Settings Header
    const renderSettingsHeader = () => (
        <div className="flex justify-between items-center w-full px-1">
            <div className="w-1/3 flex items-center">
                <IconButton
                    icon={ChevronLeft}
                    onClick={handleBackFromSettings}
                    className=" text-pink scale-150"
                />
            </div>
            <div className="w-1/3 flex justify-center">
                <h1 className="font-bold text-2xl text-darkest-blue select-none">Settings</h1>
            </div>
            <div className="w-1/3 flex justify-end"></div>
        </div>
    )

    // Main Header
    const renderMainHeader = () => (
        <div className="flex justify-between items-center w-full">
            <div className="w-1/3"></div>
            <div className="w-1/3 flex justify-center">
                <h1 className="font-bold text-2xl text-darkest-blue select-none">heartbeat</h1>
            </div>
            <div className="w-1/3 flex justify-end gap-3">
                <IconButton
                    icon={Settings2}
                    onClick={handleSettings}
                    className="text-pink"
                />
                <IconButton
                    icon={LogOut}
                    onClick={handleLogout}
                    className="text-pink"
                />
            </div>
        </div>
    )

    const renderHeader = () => {
        switch (headerType) {
            case HEADER_TYPES.AUTH:
                return renderAuthHeader()
            case HEADER_TYPES.SETUP:
                return renderSetupHeader()
            case HEADER_TYPES.SETTINGS:
                return renderSettingsHeader()
            case HEADER_TYPES.MAIN:
                return renderMainHeader()
            default:
                return renderAuthHeader()
        }
    }

    return (
        <header className="px-4 py-5 bg-lightest">
            {renderHeader()}
        </header>
    )
}