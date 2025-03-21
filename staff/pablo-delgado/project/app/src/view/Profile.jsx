import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import LanguageContext from '../logic/users/LanguageContext.jsx';
import { DogIcon } from './icons/DogIcon.jsx';
import { CatIcon } from './icons/CatIcon.jsx';
import Alert from '../view/components/Alert.jsx'; 
import getUserData from '../logic/users/getUserData.js'

export default function Profile() {
    const navigate = useNavigate();
    const { language } = useContext(LanguageContext);

    const [petType, setPetType] = useState(null);
    const [userName, setUserName] = useState(null);
    const [showAlert, setShowAlert] = useState(false); 
    const [loading, setLoading] = useState(true);  // Añadimos estado de carga

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserData();  // Usamos getUserData para obtener los datos
                if (user) {
                    setPetType(user.petType);
                    setUserName(user.name);
                } else {
                    setPetType(null);
                    setUserName(null);
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            } finally {
                setLoading(false);  // Terminamos el estado de carga una vez obtenemos los datos
            }
        };
    
        fetchUserData();
    }, []);  // Solo se ejecuta una vez al montar el componente

    const handleLogout = () => {
        setShowAlert(true);
    };

    const confirmLogout = () => {
        setShowAlert(false);
        logic.logoutUser();  // Lógica para cerrar sesión

        // Limpiamos el estado después de cerrar sesión
        setPetType(null);
        setUserName(null);

        navigate('/');  // Redirige a la página de inicio
    };

    const cancelLogout = () => {
        setShowAlert(false);
    };

    // Si estamos cargando, mostramos un mensaje de carga
    if (loading) return <p>Cargando...</p>;

    return (
        <div className="min-h-screen bg-teal-900 text-white py-8 px-4">
            <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 border-4 border-teal-500 rounded-full flex items-center justify-center">
                    {petType === 'dog' ? <DogIcon className="w-8 h-8 text-teal-500" />
                    : petType === 'cat' ? <CatIcon className="w-10 h-10 text-teal-500" />
                    : '❓'}
                </div>
                <h2 className="text-2xl font-bold">{userName ? userName : 'Username'}</h2>
            </div>

            <div className="space-y-4">
                <button onClick={() => navigate('/account-details')} className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md">
                    {language === 'es' ? 'Detalles de la cuenta' : 'Account Details'}
                </button>
                <button onClick={() => navigate('/settings')} className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md">
                    {language === 'es' ? 'Configuración' : 'Settings'}
                </button>
                <button onClick={() => navigate('/reviews')} className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md">
                    {language === 'es' ? 'Valoraciones' : 'Reviews'}
                </button>
                <button onClick={() => navigate('/payment-history')} className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md">
                    {language === 'es' ? 'Historial de pagos' : 'Payment history'}
                </button>
                <button onClick={handleLogout} className="w-full text-left bg-red-500 hover:bg-red-400 text-white py-3 px-4 rounded-lg shadow-md">
                    {language === 'es' ? 'Cerrar sesión' : 'Sign out'}
                </button>
            </div>

            {showAlert && (
                <Alert
                    message={language === 'es' ? '¿Quieres cerrar sesión?' : 'Do you want to log out?'}
                    level="warn"
                    onAccepted={confirmLogout}
                    onCanceled={cancelLogout}
                />
            )}
        </div>
    );
}
