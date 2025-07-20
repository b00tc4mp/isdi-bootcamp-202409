import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Login, Register, Home } from './view';

export default function App() {
    const navigate = useNavigate();

    // Funciones de navegación entre Login y Register
    const handleRegisterClick = () => navigate('/register');
    const handleLoginClick = () => navigate('/login');
    const handleHomeClick = () => navigate('/home')

    return (
        <Routes>
            {/* Ruta para Login */}
            <Route
                path="/login"
                element={<Login onRegisterClick={handleRegisterClick} />}
            />

            <Route
                path="/home"
                element={<Home />}
            />

            {/* Ruta para Register */}
            <Route
                path="/register"
                element={<Register onLoginClick={handleLoginClick} />}
            />

            {/* Ruta predeterminada que redirige al Login */}
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}
