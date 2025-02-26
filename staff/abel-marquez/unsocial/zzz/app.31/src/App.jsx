import { useState } from 'react'

import { Login, Register, Posts, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default function App() {

  const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login')
    

    handlePostCreated = () => setView('posts')

    handleUserLoggedOut = () => setView('login' )

    handleUserLoggedIn = () => setView('posts')

    handleRegisterClick = () => setView('register')

    handleLoginClick = () => setView('login')

    handleUserRegistered = () => setView('login')

    handleNewPostClick = () => setView('new-post')

    handleHomeClick = () => setView('posts')

    
        console.log('App -> render')

        return <>
            <Header view={view} onHomeClick={handleHomeClick} onLoggedOut ={handleUserLoggedOut} />

            {view === 'login' && <Login
                onLoggedIn={handleUserLoggedIn}
                onRegisterClick={handleRegisterClick}
            />}

            {view === 'register' && <Register
                onLoginClick={handleLoginClick}
                onRegistered={handleUserRegistered}
            />}

            {view === 'posts' && <Posts />}

            {view === 'new-post' && <CreatePost onCreated={handlePostCreated} />}

            <Footer onNewPostClick={handleNewPostClick} view={view} />
        </>
    }
