import { useContext } from 'react';
import LanguageContext from '../../logic/users/LanguageContext.jsx';

export default function Alert({ message, level, onAccepted, onCanceled }) {
    const { language } = useContext(LanguageContext); // Obtener el idioma actual

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-teal-800 text-white p-6 rounded-lg shadow-lg w-80 text-center">
                <p className="text-lg font-semibold">{message}</p>
                <div className="mt-4 flex justify-around">
                    <button
                        onClick={onCanceled}
                        className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg"
                    >
                        {language === 'es' ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                        onClick={onAccepted}
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"
                    >
                        {language === 'es' ? 'Aceptar' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}
