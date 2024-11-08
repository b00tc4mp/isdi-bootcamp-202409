import { useState } from 'react'

import { Login, Register, Posts, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import ProfileData from './components/functional/ProfileData'

import logic from './logic'


export default function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'login')

  const handlePostCreated = () => setView('posts')

  const handleUserLoggedOut = () => setView('login')

  const handleUserLoggedIn = () => setView('posts')

  const handleRegisterClick = () => setView('register')

  const handleLoginClick = () => setView('login')

  const handleUserRegistered = () => setView('login')

  const handleNewPostClick = () => setView('new-post')

  const handleHomeClick = () => setView('posts')

  const handlProfileClick = () => setView('profile')


  return <>
    <Header view={view}
      onHomeClick={handleHomeClick}
      onLoggedOut={handleUserLoggedOut}
      onProfileClick={handleUserRegistered} />

    {
      view === 'login'
      && <Login
        onLoggedIn={handleUserLoggedIn}
        onRegisterLink={handleRegisterClick} />
    }
    {
      view === 'register'
      && <Register
        registered={handleUserRegistered} />
    }
    {view === 'posts' && <Posts />}

    {view === 'new-post' && <CreatePost
      onCreated={handlePostCreated} />}

    {
      view === 'profile'
      && <ProfileData
        home={handleHomeClick}
        onProfile={handlProfileClick} />
    }


    <Footer onNewPostClick={handleNewPostClick} view={view} />
  </>
}

