import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logic from '../../logic';
import LanguageContext from '../../logic/users/LanguageContext.jsx';
import { ProfileIcon } from '../icons/ProfileIcon';
import { PawIcon } from '../icons/PawIcon.jsx'
import pawegg from '../../../../media/pawegg.png'
import SpainFlag from '../../../../media/SpainFlag.png';
import UkFlag from '../../../../media/UkFlag.png';
import Alert from '../components/Alert'; // Importamos la alerta personalizada

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null);
    const [showMenu, setShowMenu] = useState(false); // Controla el menú
    const [showAlert, setShowAlert] = useState(false); // Estado para la alerta de logout
    const location = useLocation();
    const navigate = useNavigate();
    const { language, setLanguage } = useContext(LanguageContext); // Usa el idioma global

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name) {
                logic.getUserName()
                    .then(setName)
                    .catch(error => {
                        alert(error.message);
                        console.error(error);
                    });
            }
        } else setName(null);
    }, [location.pathname]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'es' || storedLanguage === 'en') {
            setLanguage(storedLanguage);
        } else {
            setLanguage('es'); // Por defecto, español
        }
    }, []);

    const handleLogout = () => {
        setShowAlert(true); // Muestra la alerta personalizada
    };

    const confirmLogout = () => {
        setShowAlert(false); // Cierra la alerta
        logic.logoutUser();
        onLoggedOut();
        navigate('/'); // Redirige a la página principal o de login
    };

    const cancelLogout = () => {
        setShowAlert(false); // Simplemente cierra la alerta
    };

    const handleProfileMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'es' ? 'en' : 'es';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage); // Guarda el idioma seleccionado
    };

    return (
        <>
            <header className="dark:bg-[var(--back-color-dark)] bg-[var(--back-color)] p-4 h-12 box-border flex justify-between items-center fixed top-0 w-full">
                {/* Botón de cambio de idioma en la esquina superior izquierda */}
                <div className="absolute left-4 top-4">
                    <button
                        onClick={toggleLanguage}
                        className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-200"
                    >
                        <img src={language === 'en' ? UkFlag : SpainFlag} alt="language flag" className="w-6 h-6" />
                    </button>
                </div>

                {/* Botón de perfil en la esquina superior derecha */}
                {logic.isUserLoggedIn() && (
                    <div className="absolute right-4 top-4">
                        <button
                            onClick={handleProfileMenuToggle}
                            className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-200"
                        >
                            <PawIcon className="w-12 h-12"/>
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
                                <button
                                    onClick={handleLogout}
                                    className="block text-left w-full px-4 py-2 hover:bg-gray-200"
                                >
                                    {language === 'es' ? 'Cerrar sesión' : 'Log out'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* Alerta de cierre de sesión */}
            {showAlert && (
                <Alert
                    message={language === 'es' ? '¿Quieres cerrar sesión?' : 'Do you want to log out?'}
                    level="warn"
                    onAccepted={confirmLogout}
                    onCanceled={cancelLogout}
                />
            )}
        </>
    );
}
