import { RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { Login, SelectRoleType, RegisterDiver, RegisterCenter, HomeCenter, HomeDiver, Profile, LogBook, Search } from './view'

import { Header } from './components/index.js'
import logic from './logic/users'
/* import Router from './navigation/Router.jsx' */

export default function App() {
  const navigate = useNavigate();

  // Navigation handlers
  const handleHomeClick = () => navigate("/home");
  const handleUserLoggedOut = () => navigate("/login");
  const handleUserLoggedIn = () => navigate("/home");
  const handleRoleSelection = () => navigate("/select-role-type");
  const handleLoginClick = () => navigate("/home");
  const handleUserRegistered = () => navigate("/login");

  return (
    <>
      {logic.isUserLoggedIn() && <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />}

      <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? 
        (<Navigate to="/home" />) : (<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRoleSelection}/>) } />

        <Route path="/" element={logic.isUserLoggedIn() ? 
        (<Navigate to="/home" />) : (<Login onLoggedIn={handleUserLoggedIn} />) } />

        <Route path="/select-role-type" element={<SelectRoleType />} />

        <Route path="/register-diver" element={logic.isUserLoggedIn() ? 
        (<Navigate to="/home" />) : (<RegisterDiver onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} /> ) } />

        <Route path="/register-center" element={logic.isUserLoggedIn() ? 
        (<Navigate to="/home" />) : (<RegisterCenter onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} /> ) } />

        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/home" element={logic.isUserLoggedIn() ? (logic.isUserRoleDiver() ? 
        (<HomeDiver />) : logic.isUserRoleCenter() ? (<HomeCenter /> ) : (<Navigate to="/login" /> ) ) : (<Navigate to="/login" /> ) } />

        <Route path="/personal-info" element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to="/login" /> } />

        <Route path="/log-book" element={logic.isUserLoggedIn() ? <LogBook /> : <Navigate to="/login" /> } />


       

        

      </Routes>

    

      {/* logic.isUserLoggedIn() &&  <Footer /> */}
    </>
  );
}
// <Route path="/search" element={<Search />} /> 

//<Route path="/docs-insurance" element={logic.isUserLoggedIn() ? <DocInsurance /> : <Navigate to"/login"/> } />

//<Route path="/dive-history" element={logic.isUserLoggedIn() ? <DiveHistory /> : <Navigate to"/login"/> } />