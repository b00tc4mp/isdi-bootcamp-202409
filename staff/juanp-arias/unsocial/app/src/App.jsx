import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, PostList, CreatePost, Profile } from './view'

import Header from './components/function/Header'
import Footer from './components/function/Footer'

import logic from './logic'

export default function App() {
    const navigate = useNavigate()

    const handlePostCreated = () => navigate('/')

    const handleUserLoggedOut = () => navigate('/login')

    const handleUserLoggedIn = () => navigate('/')

    const handleRegisterClick = () => navigate('/register')

    const handleLoginClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleNewPostClick = () => navigate('/new-post')

    const handleHomeClick = () => navigate('/')

    const handleProfileClick = () => navigate('/profile')

    return <div>

        <Header
            onHomeClick={handleHomeClick}
            onLoggedOut={handleUserLoggedOut}
            onProfileClick={handleProfileClick} />

        <Routes>
            <Route path="/login"
                element={logic.isUserLoggedIn() ? <Navigate to="/" /> :
                    <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register"
                element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register
                    onLoginClick={handleLoginClick}
                    onRegistered={handleUserRegistered}
                />} />

            <Route path="/"
                element={logic.isUserLoggedIn() ? <PostList /> : <Navigate to="/login" />} />

            <Route path="/new-post"
                element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

            <Route path="/profile"
                element={logic.isUserLoggedIn() ? <Profile onHomeClick={handleHomeClick} /> : <Navigate to="/login" />} />

        </Routes>

        <Footer onNewPostClick={handleNewPostClick} />
    </div>
}


