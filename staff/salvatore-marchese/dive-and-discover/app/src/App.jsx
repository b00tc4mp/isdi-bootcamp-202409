import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, SelectRoleType, RegisterDiver, RegisterCenter, HomeDiver, } from './view/index'

import Header from './view/components/Header'

import logic from './logic'

export default function App() {
  const navigate = useNavigate()

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRoleSelection = () => navigate('/select-role-type')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleHomeClick = () => navigate('/')

  console.log('App -> render')

  return <>
    <Header onHomeClick= {handleHomeClick} onLoggedOut= {handleUserLoggedOut} />

    <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRoleSelection} />} /> 

         <Route path="/" element={<Login />} />
        <Route path="/select-role-type" element={<SelectRoleType />} /> 

        <Route path="/registerDiver" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <RegisterDiver onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} /> 

        <Route path="/registerCenter" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <RegisterCenter onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} /> 

        <Route path="/" element={logic.isUserLoggedIn() ? <HomeDiver /> : <Navigate to="/login" />} />

        <Route path="/" element={logic.isUserLoggedIn() ? <HomeCenter /> : <Navigate to="/login" />} />

        
    </Routes>
  </>
}