import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes añadir la lógica para cerrar sesión (limpiar tokens, etc.)
        console.log('Cerrando sesión...');
        navigate('/login'); // Redirige al login
    };

    return (
        <div className="min-h-screen bg-teal-900 text-white py-8 px-4">
            {/* Cabecera */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    {/* Aquí puedes usar un avatar dinámico o una imagen subida */}
                    🐕
                </div>
                <h2 className="text-2xl font-bold">Toby, 5 años</h2>
            </div>

            {/* Opciones */}
            <div className="space-y-4">
                <button
                    onClick={() => navigate('/account-details')}
                    className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md"
                >
                    Detalles de la cuenta
                </button>

                <button
                    onClick={() => navigate('/settings')}
                    className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md"
                >
                    Configuración
                </button>

                <button
                    onClick={() => navigate('/reviews')}
                    className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md"
                >
                    Reseñas
                </button>

                <button
                    onClick={() => navigate('/payment-history')}
                    className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md"
                >
                    Payment history
                </button>

                <button
                    onClick={() => navigate('/pets')}
                    className="w-full text-left bg-teal-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md"
                >
                    Pets
                </button>

                <button
                    onClick={handleLogout}
                    className="w-full text-left bg-red-500 hover:bg-red-400 text-white py-3 px-4 rounded-lg shadow-md"
                >
                    Cerrar sesión
                </button>
            </div>
            
        </div>
    );

}
