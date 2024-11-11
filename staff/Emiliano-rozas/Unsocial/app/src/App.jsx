import { useState } from 'react'

import { Login, Register, Posts, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default function App() {

  const [view, setView] = useState(logic.isUserLoggedIn() ? "posts" : "login")


  const handleHomeclick = () => setView('posts')

  const handleLoggedOut = () => setView('login')

  const handleLoggedIn = () => setView("posts")

  const handleRegister = () => setView("register")

  const handleLogBack = () => setView("login")

  const handleUserRegistered = () => setView('login')

  const handlePostCreated = () => setView('posts')

  const handleOnCanceled = () => setView('posts')

  const handleNewPostClick = () => setView('new-post')

  console.log('App-> render')

  return <>

    <Header view={view} onHomeClick={handleHomeclick} onLoggedOut={handleLoggedOut} />

    {view === "login" && <Login
      onLoggedIn={handleLoggedIn}
      registerInquire={handleRegister}
    />}

    {view === "register" && <Register
      logBack={handleLogBack}
      onRegistered={handleUserRegistered}
    />}

    {view === "posts" && <Posts />}

    {view === 'new-post' && <CreatePost
      onCreated={handlePostCreated}
      onCancel={handleOnCanceled}
    />}

    <Footer onNewPostClick={handleNewPostClick} view={view} />
  </>
}


