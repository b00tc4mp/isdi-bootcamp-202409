import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'

import Hello from './view/Hello'
import Search from './view/Search'
import Profile from './view/Profile'

import Header from './view/components/Header'
import Footer from './view/components/Footer'

import logic from './logic'

export default function App() {
    const navigate = useNavigate()

    const handlePostCreated = () => navigate('/') // setView('posts')

    const handleUserLoggedOut = () => navigate('/login') //navigate('/login')

    const handleUserLoggedIn = () => navigate('/') // setView('posts')

    const handleRegisterClick = () => navigate('/register') // setView('register')

    const handleLoginClick = () => navigate('/login') // setView('login')

    const handleUserRegistered = () => navigate('/login') // setView('login')

    const handleNewPostClick = () => navigate('/new-post') // setView('new-post')

    const handleHomeClick = () => navigate('/') // setView('posts')


    console.log('App -> render')

    return <>
        <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

        {/* {view === 'login' && <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} */}

        {/* {view === 'register' && <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} */}

        {/* {view === 'posts' && <Home />} */}

        {/* {view === 'new-post' && <CreatePost onCreated={handlePostCreated} />} */}

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

            <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

            {/* extra demos */}
            <Route path="/hello/:name" element={<Hello />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:userId/*" element={<Profile />} />
        </Routes>

        <Footer onNewPostClick={handleNewPostClick} />
    </>
}