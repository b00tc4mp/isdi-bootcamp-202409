import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, SelectRoleType, RegisterDiver, RegisterCenter, HomeCenter, HomeDiver, PersonalInfoForm } from './view'

import { Header, Footer } from './view/components'
import logic from '../../api/logic'

export default function App() {
  const navigate = useNavigate()

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/home')

  const handleRoleSelection = () => navigate('/select-role-type')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleHomeClick = () => navigate('/')

  console.log('App -> render')

  return <>
    <Header onHomeClick= {handleHomeClick} onLoggedOut= {handleUserLoggedOut} />

    <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRoleSelection} />} /> 

         <Route path="/" element={logic.isUserLoggedIn() ? ( <Navigate to="/home" />) : (<Login onLoggedIn={handleUserLoggedIn}/> )} />

        <Route path="/select-role-type" element={<SelectRoleType />} /> 

        <Route path="/register-diver" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <RegisterDiver onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} /> 

        <Route path="/register-center" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterCenter onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} /> 

        <Route path="/home" element={logic.isUserLoggedIn() && logic.isUserRoleDiver() ? (logic.isUserRoleDiver() ? (<HomeDiver />) : logic.isUserLoggedIn() && logic.isUserRoleCenter() ? (<HomeCenter />) : (<Navigate to="/login" />) ) : (<Navigate to="/login" />) } />

        <Route path="/personal-info-form" element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to="/home" />} />

    </Routes>
    {logic.isUserLoggedIn() && <Footer />}
  </>
}
