import logic from './logic'

import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'

import { Login, Register, Home } from './view'
import { Header, NoUserLoggedInAlert, OnePieceDle } from './view/components'

export default function App() {
    const navigate = useNavigate()
    const location = useLocation()

    const handleUserLoggedIn = () => navigate('/')

    const handleRegisterAnchorClick = () => navigate('/register')

    const handleLoginAnchorClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleLogout = () => navigate('/login')

    const handleHomeClick = () => navigate('/')

    const handleLoginClick = () => navigate('/login')

    const handleRegisterClick = () => navigate('/register')

    const handlePlayAsGuestClick = () => navigate('/')

    const handleGuessCharacterClick = () => navigate('/onepiecedle')

    return <main className="h-screen, w-screen">
        {location.pathname !== 'map' && <Header onLoggedOut={handleLogout} onHomeClick={handleHomeClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />}

        <Routes>
            <Route path="/" element={<Home onGuessCharacter={handleGuessCharacterClick} />} />

            <Route path="/login" element={logic.isUserLoggedIn() && logic.isUserRoleRegular() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterAnchorClick={handleRegisterAnchorClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() && logic.isUserRoleRegular() ? <Navigate to="/" /> : <Register onLoginAnchorClick={handleLoginAnchorClick} onRegistered={handleUserRegistered} />} />

            <Route path="/onepiecedle" element={<OnePieceDle />} />
        </Routes>

        {location.pathname !== '/login' && location.pathname !== '/register' && !logic.isUserLoggedIn() && <NoUserLoggedInAlert asGuest={handlePlayAsGuestClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />}
    </main>
}