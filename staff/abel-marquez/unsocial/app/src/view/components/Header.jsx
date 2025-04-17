import { useState, useEffect } from 'react'
 
import { useLocation } from 'react-router-dom'

import { Button } from '../library'

import logic from '../../logic'

import './Header.css'

import useContext from '../useContext'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

    const { alert, confirm } = useContext()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillReceiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName((error, name) => {
                        if (error) {
                            alert(error.message)

                            console.error(error)

                            return
                        }

                        setName(name)
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
        },'warn')
    }

    console.log('Header -> render')

    return <header className="Header">
        <h1> {location.pathname === '/new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

        {name && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
}