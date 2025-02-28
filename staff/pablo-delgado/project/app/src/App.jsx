import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Login, Register, Home, Search, Explorer, Appointments, Profile, ProviderProfile } from './view';
import { Alert } from './view/components';
import { Context } from './view/useContext';
import { Footer } from './view/components/Footer.jsx';
import Header from './view/components/Header.jsx';  // 🔹 Aquí ya corregimos la importación
import { Confirm } from './view/components/Confirm.jsx';
import { ChangePassword } from './view/components/ChangePassword.jsx';
import logic from './logic/';
import AccountDetails from './view/Profile/AccountDetails.jsx';
import LanguageContext from './logic/users/LanguageContext.jsx'

export default function App() {
    const [alert, setAlert] = useState({ message: null, level: 'error' });
    const [confirm, setConfirm] = useState({ message: null, level: 'error', callback: null });
    const navigate = useNavigate();
    const location = useLocation();

    // 🔹 Añadimos estados para el idioma
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');

    const handleUserLoggedOut = () => navigate('/login');
    const handleUserLoggedIn = () => navigate('/');
    const handleRegisterClick = () => navigate('/register');
    const handleLoginClick = () => navigate('/login');
    const handleUserRegistered = () => navigate('/');
    const handleHomeClick = () => navigate('/');
    const handleChangePasswordClick = () => navigate('/forgot-password');
    const handleAlertAccepted = () => setAlert({ message: null, level: 'error' });
    const handleConfirmAccepted = () => {
        confirm.callback(true);
        setConfirm({ message: null, level: 'error', callback: null });
    };
    const handleConfirmCancelled = () => {
        confirm.callback(false);
        setConfirm({ message: null, level: 'error', callback: null });
    };

    console.log('App -> render');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>  {/* ✅ Corrección aquí */}
            <Context.Provider value={{
                alert(message, level = 'error') { setAlert({ message, level }); },
                confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }); }
            }}>
                <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

                <Routes>
                    <Route path="/login" element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
                    <Route path="/register" element={<Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />
                    <Route path="/" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                    <Route path="/home" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/explorer" element={logic.isUserLoggedIn() ? <Explorer /> : <Navigate to="/login" />} />
                    <Route path="/appointments" element={logic.isUserLoggedIn() ? <Appointments /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="/providers/:id" element={logic.isUserLoggedIn() ? <ProviderProfile /> : <Navigate to="/login" />} />
                    <Route path="/forgot-password" element={<ChangePassword onLoginClick={handleChangePasswordClick} />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/account-details" element={logic.isUserLoggedIn() ? <AccountDetails /> : <Navigate to="/login" />} />
                    <Route path="/profile/:userId/*" element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to="/login" />} />
                </Routes>

                {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}
                {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
                {logic.isUserLoggedIn() && !['/login', '/register'].includes(location.pathname) && <Footer />}
            </Context.Provider>
        </LanguageContext.Provider>
    );
}
