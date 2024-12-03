import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Home, Register, Welcome, CreateAd } from './view'
import { Header, Footer } from './view/components'
import logic from './logic'

export default function App() {
  const navigate = useNavigate()

  const handleUserRegistered = () => navigate('/login')
  const handleUserLoggedIn = () => navigate('/')
  const handleRegisterClick = () => navigate('/register')
  const handleLoginClick = () => navigate('/login')
  const handleAdCreated = () => navigate('/')
  const handleUserLoggedOut = () => navigate('/')
  const handleNewAdClick = () => navigate('/new-ad')
  const handleHomeClick = () => navigate('/')
  const handleProfileClick = () => {
    const userId = logic.getUserId()
    navigate(`/profile/${userId}`)
  }

  console.log('App -> render')
  return (
    <>
      {logic.isUserLoggedIn() && <Header onLoggedOut={handleUserLoggedOut} />}
      <Routes>
        <Route path="/welcome" element={<Welcome onLoginClick={handleLoginClick} />} />

        <Route
          path="/register"
          element={<Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} />}
        />

        <Route
          path="/login"
          element={
            logic.isUserLoggedIn() ? (
              <Home />
            ) : (
              <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />
            )
          }
        />

        <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/welcome" />} />

        <Route
          path="/new-ad"
          element={logic.isUserLoggedIn() ? <CreateAd onCreated={handleAdCreated} /> : <Navigate to="/welcome" />}
        />
      </Routes>
      {logic.isUserLoggedIn() && (
        <Footer onNewAdClick={handleNewAdClick} onHomeClick={handleHomeClick} onProfileClick={handleProfileClick} />
      )}
    </>
  )
}
