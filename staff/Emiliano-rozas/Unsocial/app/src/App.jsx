import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'

import Hello from './view/Hello'

import Search from './view/Search'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default function App() {
  const navigate = useNavigate()


  const handleHomeclick = () => navigate('/')

  const handleLoggedOut = () => navigate('/login')

  const handleLoggedIn = () => navigate("/")

  const handleRegister = () => navigate("/register")

  const handleLogBack = () => navigate("/login")

  const handleUserRegistered = () => navigate('/login')

  const handlePostCreated = () => navigate('/')

  const handleOnCanceled = () => navigate('/')

  const handleNewPostClick = () => navigate('/new-post')

  console.log('App-> render')

  return <>

    <Header onHomeClick={handleHomeclick} onLoggedOut={handleLoggedOut} />

    {/* {view === "login" && <Login
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
    />} */}

    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleLoggedIn} registerInquire={handleRegister} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register logBack={handleLogBack} onRegistered={handleUserRegistered} />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : < Navigate to="/login" />} />

      <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} OnCancel={handleOnCanceled} /> : <Navigate to="/login" />} />

      {/* Demos search & hello user */}
      <Route path="/hello/:name" element={<Hello />} />
      <Route path="/search" element={<Search />} />

    </Routes>

    <Footer onNewPostClick={handleNewPostClick} />
  </>
}


