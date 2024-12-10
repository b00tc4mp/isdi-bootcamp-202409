import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, SelectRoleType, RegisterDiver, RegisterCenter, HomeCenter, HomeDiver, Profile } from '../view'

//import { Header, Footer } from '../components'
import logic from './../services/users'
import Layout from '../pages/Layout'

export default function Router() {
    const navigate = useNavigate()

    const handleUserLoggedOut = () => navigate('/login')

    const handleUserLoggedIn = () => navigate('/home')

    const handleRoleSelection = () => navigate('/select-role-type')

    const handleLoginClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleHomeClick = () => navigate('/')

    console.log('App -> render')

    console.log(logic)

    return (
        //<BrowserRouter>
        <Routes>
            <Route path="/" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRoleSelection} />} />

            <Route path="/select-role-type" element={<SelectRoleType />} />

            <Route path="/register-diver" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterDiver onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

            <Route path="/register-center" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterCenter onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

            <Route path="/" element={<Layout />}>
                <Route path="/home" element={condition ? <HomeDiver /> : <HomeCenter />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
        //</BrowserRouter>
    )
}
//{logic.isUserLoggedIn() && <Footer />
// <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRoleSelection} />} />
{/* 
                    

                    <Route path="/" element={logic.isUserLoggedIn() ? (<Navigate to="/home" />) : (<Login onLoggedIn={handleUserLoggedIn} />)} />

                    <Route path="/select-role-type" element={<SelectRoleType />} />

                    <Route path="/register-diver" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterDiver onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

                    <Route path="/register-center" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterCenter onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

                    

                    <Route path="/home" element={logic.isUserLoggedIn() ? (logic.isUserRoleDiver() ? <HomeDiver /> : logic.isUserRoleCenter() ? <HomeCenter /> : <Navigate to="/login" />) : <Navigate to="/login" />} />

                    <Route path="/personal-info-form" element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to="/login" />} /> */}


/*    <Routes>
<Route path="/" element={<Login/>} />

<Route path="/select-role-type" element={<SelectRoleType/>} />

<Route path="/register-diver" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterDiver onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

<Route path="/register-center" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <RegisterCenter onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

<Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRoleSelection} />} />

<Route path="/" element={<Layout />}>
   <Route path="/home" element={condition ? <HomeDiver /> : <HomeCenter />} />
   <Route path="/profile" element={<Profile />} />
</Route>
</Routes> */