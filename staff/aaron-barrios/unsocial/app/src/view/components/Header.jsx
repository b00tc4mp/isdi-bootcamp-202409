import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { Button } from '../library'

import useContext from '../useContext'

import logic from '../../logic'

import './Header.css'


export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

    const { alert, confirm } = useContext()

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name) {
                try {
                    logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.message)

                            console.error(message)
                        })
                } catch (error) {

                    alert(error.message)

                    console.error(error)
                }
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


    const onProfile = (event) => {
        event.preventDefault()

        onProfileClick()
    }

    return <header className="Header">
        <h1>{location.pathname === 'new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

        {logic.isUserLoggedIn() && <a href='' style={{ fontSize: 'medium' }} onClick={onProfile}>{name}</a>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header >
}