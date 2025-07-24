import { useState, useEffect } from 'react'

import { useNavigate,useLocation } from 'react-router-dom'

import { ThemeButton } from '.'
import { Button } from '../library'

import logic from '../../logic'

import useContext from '../useContext'


export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)
    const navigate = useNavigate()

    const location = useLocation()

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

    const handleHomeClick = event => {
        event.preventDefault()

        onHomeClick()
    }

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()

                onLoggedOut()
            }
        }, 'warn')
    }

    const handleFavoritesClick = () => navigate('/favourites')

    console.log('Header -> render')

    return <header className="dark:bg-black bg-[var(--back-color)] p-4 h-12 box-border flex justify-between items-center fixed top-0 w-full">
        <div className="flex items-center gap-4">
        <h1 className="m-0 text-2xl dark:text-white cursor-pointer" onClick={() => navigate('/')}>
    Unsocial
        </h1>

        {name && <h3 className="dark:text-white">{name}</h3>}
        </div>
        <div className="flex items-center gap-2">

        <ThemeButton />

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleFavoritesClick}>⭐</Button>}
        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>🚪</Button>}
        </div>
    </header>
}