import { useState } from 'react'

import { Login, Register, Post, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default function App() {
        console.log('App -> constructor')
const [view, setView] =useState(logic.isUserLoggedIn() ? 'post' : 'login' ) 
    
  const handlePostCreated = () => setView('post')

  const handleUserLoggedOut = () => setView('login')

  const handleUserLoggedIn = () => setView('post')

  const handleRegisterClick = () => setView('register')

  const handleLoginClick = () => setView('login')

  const handleUserRegistered = () => setView('login')

  const handleNewPostClick = () => setView('new-post')

  const  handleHomeClick = () => setView('post')


        console.log('App -> render')

        return <>
            <Header view={view} onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

            {view === 'login' && <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />}

            {view === 'register' && <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />}

            {view === 'post' && <Post />}

            {view === 'new-post' && <CreatePost onCreated={handlePostCreated} />}

            <Footer onNewPostClick={handleNewPostClick} view={view} />
        </>
 
}