import { useState } from 'react'

import { Login, Register, Posts, CreatePost } from './view/index'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'
import ProfileUser from './view/ProfileUser'

export default function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login')

  const handlePostCreated = () => setView('posts')

  const handleUserLoggedOut = () => setView('login')

  const handleUserLoggedIn = () => setView('posts')

  const handleRegisterClick = () => setView('register')

  const handleLoginClick = () => setView('login')

  const handleUserRegirtered = () => setView('login')

  const handleNewPostClick = () => setView('new-post')

  const handlePostsClick = () => setView('posts')

  const handleProfileClick = () => setView('profile')


  console.log('App -> render')

  return <>
    <Header view={view} onHomeClick={handlePostsClick} onLoggedOut={handleUserLoggedOut} onProfile={handleProfileClick} />

    {view === 'login' && <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />}

    {view === 'register' && <Register onRegisterIn={handleUserRegirtered} onLoginClick={handleLoginClick} />}

    {view === 'posts' && <Posts />}

    {view === 'new-post' && <CreatePost onCreated={handlePostCreated} />}

    {view === 'profile' && <ProfileUser onProfile={handleProfileClick} />}

    <Footer onNewPostClick={handleNewPostClick} view={view} />
  </>

}
