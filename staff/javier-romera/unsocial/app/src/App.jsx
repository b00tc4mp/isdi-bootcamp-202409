import { useState } from 'react'

import { Login, Register, Posts, CreatePost } from './view'

import Header from './view/components/Header'
import Footer from './view/components/Footer'

import logic from './logic'

export default function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login')

  const handlePostCreated = () => setView('posts')

  const handleUserLoggedOut = () => setView('login')

  const handleUserLoggedIn = () => setView('posts')

  const handleRegisterClick = () => setView('register')

  const handleLoginClick = () => setView('login')

  const handleUserRegistered = () => setView('login')

  const handleNewPostClick = () => setView('new-post')

  const handleHomeClick = () => setView('posts')

  return <>
    <Header
      view={view}
      onHomeClick={handleHomeClick}
      onLoggedOut={handleUserLoggedOut} />

    {view === 'login' && <Login
      onLoggedIn={handleUserLoggedIn}
      onRegisterClick={handleRegisterClick}
    />}

    {view === 'register' && <Register
      onLoginClick={handleLoginClick}
      onRegistered={handleUserRegistered}
    />}

    {view === 'posts' && <Posts />}

    {view === 'new-post' && <CreatePost
      onCreated={handlePostCreated} />}

    <Footer
      onNewPostClick={handleNewPostClick} view={view} />
  </>
}