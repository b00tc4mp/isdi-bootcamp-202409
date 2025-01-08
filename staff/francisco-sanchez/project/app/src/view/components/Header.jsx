import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import useContext from '../useContext'
import logic from '../../logic'

export default function Header({ onHomeClick, onLoggedOut, onViewProfile }) {
    const [name, setName] = useState(null)
    const location = useLocation()
    const { alert, confirm } = useContext()


    useEffect(() => {
        console.log('Header componentDidMount and receiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name) {
                try {
                    /* logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.error)
                            console.error(error)
                        }) */
                } catch (error) {
                    alert(error.error)
                    console.error(error)
                }
            }
        } else {
            setName(null)
        }
    }, [location.pathname])


    //Navigate to home event
    const handleHomeClick = event => {
        event.preventDefault()
        onHomeClick()
    }

    //Handle to logout aplication
    const handleLogout = event => {
        event.preventDefault()
        confirm('Are you sure you want to logout?', accepted => {
            if (accepted) {
                logic.logoutUser()
                onLoggedOut()
            }
        }, 'warn')
    }

    const handleProfileClick = event => {
        event.preventDefault()
        onViewProfile()
    }

    console.log('Header -> render')

    return <header className="bg-color_darkBlue text-white p-4 flex justify-between items-center h-28">
        <h1 className="text-4xl font-bold">{location.pathname !== '/' ? <a href="" onClick={handleHomeClick}>Hourify</a> : 'Hourify'}</h1>

        <div className='flex justify-between'>

            {logic.isUserLoggedIn() && (
                <div className="relative group">
                    <img
                        src="https://via.placeholder.com/40" // Cambia por la URL de la imagen del usuario
                        alt="User profile"
                        className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleProfileClick}>User profile</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            )}
        </div>
    </header>
}