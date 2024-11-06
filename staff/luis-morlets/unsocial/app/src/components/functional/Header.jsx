import { useEffect, useState } from 'react'

import { Button } from '../library'

import logic from '../../logic'
import './Header.css'

export default function Header({ view, onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    useEffect(() => {

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
    }, [view])

    const handleHomeClick = event => {

        try {
            event.preventDefault()

            onHomeClick()

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLogout = () => {

        try {
            const confirmLogout = window.confirm('Are you sure you want to logout?')

            if (confirmLogout) {
                logic.logoutUser()
                onLoggedOut()
            }
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Header -> render')

    return <header className="Header">
        <div className="title">
            <img src="\src\public\win-transformed.png" alt="unsocial logo" />
            <h1>{view === 'new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>
        </div>

        <div className="profile">
            {name && <h3>{name}</h3>}

            {logic.isUserLoggedIn() && <Button type="button" className="logout" onClick={handleLogout}>Logout</Button>
            }</div>
    </header>
}