import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Settings2, LogOut, ChevronLeft } from 'lucide-react'
import logic from '../../logic'
import useContext from '../useContext'

const HEADER_TYPES = {
    AUTH: 'auth',
    SETUP: 'setup',
    MAIN: 'main',
    SETTINGS: 'settings'
}

export default function Header({ onLoggedOut, onSettingsClick, onBackFromSettings }) {
    const userLoggedIn = logic.isUserLoggedIn()

    const [isLoggedIn, setIsLoggedIn] = useState(userLoggedIn)
    const [headerType, setHeaderType] = useState(HEADER_TYPES.AUTH)
    const [setupProgress, setSetupProgress] = useState(0)

    const { confirm } = useContext()
    const location = useLocation()

    useEffect(() => {
        setIsLoggedIn(userLoggedIn)
    }, [location.pathname])

    // Determine which header to show based on current route and auth status
    useEffect(() => {
        const path = location.pathname

        if (!userLoggedIn) {
            setHeaderType(HEADER_TYPES.AUTH)
        } else if (path.includes('/setup/')) {
            setHeaderType(HEADER_TYPES.SETUP)

            if (path.includes('name-dob')) {
                setSetupProgress(33)
            } else if (path.includes('gender')) {
                setSetupProgress(66)
            } else if (path.includes('artists')) {
                setSetupProgress(100)
            }
        } else if (path === '/settings') {
            setHeaderType(HEADER_TYPES.SETTINGS)
        } else {
            setHeaderType(HEADER_TYPES.MAIN)
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
            <h1 className="font-bold text-2xl text-center text-darkest-blue">HEARTBEAT</h1>
        </div>
    )

    // Setup Header
    const renderSetupHeader = () => (
        <div className="w-full px-2">
            <div className="w-full flex flex-col items-center">
                <div className="w-full bg-light rounded-full h-3">
                    <div className="bg-dark-blue h-3 rounded-full transition-all duration-700" style={{ width: `${setupProgress}%` }}></div>
                </div>
            </div>
        </div>
    )

    // Settings Header
    const renderSettingsHeader = () => (
        <div className="flex justify-between items-center w-full px-1">
            <div className="w-1/3 flex items-center">
                <button className="scale-150" onClick={handleBackFromSettings}>
                    <ChevronLeft className="text-pink" />
                </button>
            </div>
            <div className="w-1/3 flex justify-center">
                <h1 className="font-bold text-2xl text-darkest-blue">Settings</h1>
            </div>
            <div className="w-1/3 flex justify-end"></div>
        </div>
    )

    // Main Header
    const renderMainHeader = () => (
        <div className="flex justify-between items-center w-full">
            <div className="w-1/3"></div>
            <div className="w-1/3 flex justify-center">
                <h1 className="font-bold text-2xl text-darkest-blue">HEARTBEAT</h1>
            </div>
            <div className="w-1/3 flex justify-end gap-3">
                <button onClick={handleSettings}>
                    <Settings2 className="text-pink" size={26} />
                </button>
                <button onClick={handleLogout}>
                    <LogOut className="text-pink" size={26} />
                </button>
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
// TODO: posar SystemErrors? userLoggedIn com a dependency del useEffect?