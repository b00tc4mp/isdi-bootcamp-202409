import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, SelectRoleType, RegisterDiver, RegisterCenter, HomeCenter, HomeDiver } from './view'

import Header from './view/components/Header'

import logic from './logic'

export default function App() {
  const navigate = useNavigate()

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/home')

  const handleRoleSelection = () => navigate('/select-role-type')

  const handleLoginClick = () => navigate('/')

  const handleUserRegistered = () => navigate('/login')

  const handleHomeClick = () => navigate('/')

  console.log('App -> render')

  return <>
    <Header onHomeClick= {handleHomeClick} onLoggedOut= {handleUserLoggedOut} />

    <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRoleSelection} />} /> 

         <Route path="/" element={<Login onLoggedIn={handleUserLoggedIn}/>} />

        <Route path="/select-role-type" element={<SelectRoleType />} /> 

        <Route path="/register-diver" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <RegisterDiver onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} /> 

        <Route path="/register-center" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <RegisterCenter onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} /> 

        <Route path="/home" element={logic.isUserRoleDiver() ?  <HomeDiver /> : < Navigate to="/login" />} onLoginClick={handleLoginClick} />

        <Route path="/home" element={logic.isUserRoleCenter() ? <HomeCenter /> : <Navigate to="/login" />} onLoginClick={handleLoginClick} />

        
    </Routes>
  </>
}
