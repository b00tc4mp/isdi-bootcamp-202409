import { useState } from 'react'

import { PostList, Login, Register, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default function App() {

    const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login')

    const handleHomeClick = () => setView('posts')
    const handleUserLoggedOut = () => setView('login')
    const handleUserLoggedIn = () => setView('posts')
    const handleRegisterLink = () => setView('register')
    const handleUserRegistered = () => setView('login')
    const handleLoginLink = () => setView('login')
    const handlePostCreated = () => setView('posts')
    const handleNewPostClick = () => setView('new-post')

    console.log('App -> render')
    return <>
        <Header view={view} onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

        {view === 'login' && <Login onLoggedIn={handleUserLoggedIn} onRegisterLink={handleRegisterLink} />}

        {view === 'register' && <Register onRegister={handleUserRegistered} onLoginLink={handleLoginLink} />}

        {view === 'posts' && <PostList />}

        {view === 'new-post' && <CreatePost onCreatePost={handlePostCreated} />}

        <Footer onNewPostClick={handleNewPostClick} view={view} />
    </>
}