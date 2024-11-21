import { Routes, Route, Navigate, useNavigate, Router } from 'react-router-dom'

import { Home, Login, Register, CreatePost } from './view'
import Hello from './view/Hello'
import Search from './view/Search'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default function App() {
    const navigate = useNavigate()

    const handleHomeClick = () => navigate('/') //setView('posts')
    const handleUserLoggedOut = () => navigate('/login') //setView('login')
    const handleUserLoggedIn = () => navigate('/') //setView('posts')
    const handleRegisterLink = () => navigate('/register') //setView('register')
    const handleUserRegistered = () => navigate('/login') //setView('login')
    const handleLoginLink = () => navigate('/login') //setView('login')
    const handlePostCreated = () => navigate('/') //setView('posts')
    const handleNewPostClick = () => navigate('/new-post') //setView('new-post')

    console.log('App -> render')
    return <>
        <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

        {/* {view === 'login' && <Login onLoggedIn={handleUserLoggedIn} onRegisterLink={handleRegisterLink} />}

        {view === 'register' && <Register onRegister={handleUserRegistered} onLoginLink={handleLoginLink} />}

        {view === 'posts' && <PostList />}

        {view === 'new-post' && <CreatePost onCreatePost={handlePostCreated} />} */}

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterLink={handleRegisterLink} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegister={handleUserRegistered} onLoginLink={handleLoginLink} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

            <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreatePost={handlePostCreated} /> : <Navigate to="/login" />} />

            {/* demos for usefull routes */}
            <Route path="/hello/:name" element={<Hello />} />
            <Route path="/search" element={<Search />} />
        </Routes>

        <Footer onNewPostClick={handleNewPostClick} />
    </>
}