import { RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import { Login, SelectRoleType, RegisterDiver, RegisterCenter, HomeCenter, HomeDiver, ProfileCenter, Profile, LogBook, Search, FaunaFlora } from './view'

import { Header } from './components/index.js'
import logic from './logic/users'
import DiveHistory from './view/diver/DiveHistory.jsx';
import EditLog from './view/diver/EditLog.jsx';


export default function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  const navigate = useNavigate();

  // Navigation handlers
  const handleHomeClick = () => navigate("/home");
  const handleUserLoggedOut = () => navigate("/login");
  const handleUserLoggedIn = () => navigate("/home");
  const handleRoleSelection = () => navigate("/select-role-type");
  const handleLoginClick = () => navigate("/home");
  const handleUserRegistered = () => navigate("/login");

  const isLoggedIn = logic.isUserLoggedIn();
  const isUserRoleDiver = logic.isUserRoleDiver();

  return (
    <>

      <div
        className={`min-h-screen ${!isLoginPage ? "bg-cover bg-center" : ""}`}
        style={{
          backgroundImage: !isLoginPage
            ? 'url("https://images.unsplash.com/photo-1561623002-b6648b879b15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGZpc2hlcyUyMGluJTIwdGhlJTIwcmVlZnxlbnwwfHwwfHx8Mg%3D%3D")'
            : 'none',
        }}
      >

        {logic.isUserLoggedIn() && <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />}

        <Routes>
          <Route path="/login" element={logic.isUserLoggedIn() ?
            (<Navigate to="/home" />) : (<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRoleSelection} />)} />

          <Route path="/" element={logic.isUserLoggedIn() ?
            (<Navigate to="/home" />) : (<Login onLoggedIn={handleUserLoggedIn} />)} />

          <Route path="/select-role-type" element={<SelectRoleType />} />

          <Route path="/register-diver" element={logic.isUserLoggedIn() ?
            (<Navigate to="/home" />) : (<RegisterDiver onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />)} />

          <Route path="/register-center" element={logic.isUserLoggedIn() ?
            (<Navigate to="/home" />) : (<RegisterCenter onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />)} />

          <Route path="*" element={<Navigate to="/login" />} />

          <Route path="/home" element={logic.isUserLoggedIn() ? (logic.isUserRoleDiver() ?
            (<HomeDiver />) : logic.isUserRoleCenter() ? (<HomeCenter />) : (<Navigate to="/login" />)) : (<Navigate to="/login" />)} />

          <Route path="/profile" element={!isLoggedIn ? <Navigate to="/login" /> : isUserRoleDiver ? <Profile /> : <ProfileCenter />} />

          <Route path="/log-book" element={logic.isUserLoggedIn() ? <LogBook /> : <Navigate to="/login" />} />

          <Route path="/check-logbook" element={logic.isUserLoggedIn() ? <DiveHistory /> : <Navigate to="/login" />} />

          <Route path="/edit-logbook/:logbookId" element={<EditLog />} />

          <Route path="/log-book/:logbookId" element={<EditLog />} />

          <Route path="/search" element={logic.isUserLoggedIn() ? <Search /> : <Navigate to="/login" />} />

          <Route path="/faunaFlora/:city" element={logic.isUserLoggedIn() ? <FaunaFlora /> : <Navigate to="/login" />} />


        </Routes>

      </div>

      {/* logic.isUserLoggedIn() &&  <Footer /> */}
    </>
  );
}
