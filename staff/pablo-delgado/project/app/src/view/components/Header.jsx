import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logic from '../../logic'
import useContext from '../useContext'
import { ProfileIcon } from '../icons/ProfileIcon' // Asegúrate de tener el componente de icono
import Button from '../components/Button'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)
    const [showMenu, setShowMenu] = useState(false) // Controla el menú desplegable
    const location = useLocation()
    const navigate = useNavigate()
    const { alert, confirm } = useContext()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillReceiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
        } else setName(null)
    }, [location.pathname])

    const handleHomeClick = (event) => {
        event.preventDefault()
        onHomeClick()
    }

    const handleLogout = () => {
        confirm('Logout?', (accepted) => {
            if (accepted) {
                logic.logoutUser()
                onLoggedOut()
                navigate('/') // Redirige a la página principal o de login
            }
        }, 'warn')
    }

    const handleProfileMenuToggle = () => {
        setShowMenu(!showMenu)
    }

    return (
        <header className="dark:bg-[var(--back-color-dark)] bg-[var(--back-color)] p-4 h-12 box-border flex justify-between items-center fixed top-0 w-full">
            {logic.isUserLoggedIn() && (
                <div className="absolute right-4 top-4"> {/* Posicionamos absolutamente en la esquina superior derecha con margen */}
                    <button
                        onClick={handleProfileMenuToggle}
                        className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-200"
                    >
                        <ProfileIcon />
                    </button>
    
                    {showMenu && (
                        <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
                            <button
                                onClick={handleLogout}
                                className="block text-left w-full px-4 py-2 hover:bg-gray-200"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );    
}

export { Header }
