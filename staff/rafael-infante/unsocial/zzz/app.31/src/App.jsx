import { useState } from "react"

import { Login, Register, Posts, CreatePost } from "./view"

import { Header, Footer } from './components/functional'

import logic from "./logic"

export default function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login')

  const handleHomeClick = () => setView('posts')

  const handleUserLoggedOut = () => {
    setView('login')
    logic.logoutUser()
  }

  const handleUserloggedIn = () => setView('posts')

  const handleAnchorRegister = () => setView('register')

  const handleUserRegistered = () => setView('login')

  const handleAnchorLogin = () => setView('login')

  const handlePostCreated = () => setView('posts')

  const handleNewPostClick = () => setView('new-post')


  console.log('App -> render')

  return (
    <>
      <Header view={view}
        onHomeClick={handleHomeClick}
        onLoggedOut={handleUserLoggedOut} />

      {view === 'login' && <Login
        onLoggedIn={handleUserloggedIn}
        onAnchorRegister={handleAnchorRegister}
      />}

      {view === 'register' && <Register
        onRegistered={handleUserRegistered}
        onAnchorLogin={handleAnchorLogin}
      />}

      {view === 'posts' && <Posts />}

      {view === 'new-post' && <CreatePost
        onCreated={handlePostCreated} />}

      <Footer view={view}
        onHomeClick={handleHomeClick}
        onNewPostClick={handleNewPostClick} />
    </>
  )
}

