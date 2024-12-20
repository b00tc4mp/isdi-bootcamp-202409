import { useLocation } from 'react-router-dom'

import { CalendarIcon, ExplorerIcon, HomeIcon, ProfileIcon } from '../icons'

import { Link } from 'react-router-dom';

export default function Footer({ onNewPostClick }) {
    console.log('Footer -> render')

    const location = useLocation()

    return (
        <footer className="bg-green-500 p-4 h-16 box-border flex justify-around items-center fixed bottom-0 w-full rounded-t-lg shadow-lg">
            {/* Botón de Home */}
            <Link
                to="/home"
                className={`flex flex-col items-center ${
                    location.pathname === '/home' ? 'text-white' : 'text-gray-200'
                }`}
            >
                <HomeIcon /> {/* Icono de Home */}
                <span className="text-xs">Home</span>
            </Link>

            {/* Botón de Explorer */}
            <Link
                to="/explorer"
                className={`flex flex-col items-center ${
                    location.pathname === '/explorer' ? 'text-white' : 'text-gray-200'
                }`}
            >
                <ExplorerIcon /> {/* Icono de Explorer */}
                <span className="text-xs">Explora</span>
            </Link>

            {/* Botón de Citas */}
            <Link
                to="/appointments"
                className={`flex flex-col items-center ${
                    location.pathname === '/appointments' ? 'text-white' : 'text-gray-200'
                }`}
            >
                <CalendarIcon /> {/* Icono de Citas */}
                <span className="text-xs">Citas</span>
            </Link>

            {/* Botón de Perfil */}
            <Link
                to="/profile"
                className={`flex flex-col items-center ${
                    location.pathname === '/profile' ? 'text-white' : 'text-gray-200'
                }`}
            >
                <ProfileIcon /> {/* Icono de Perfil */}
                <span className="text-xs">Perfil</span>
            </Link>
        </footer>
    );
}

export { Footer };