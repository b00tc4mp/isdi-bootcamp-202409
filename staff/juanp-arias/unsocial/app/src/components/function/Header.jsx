import { useEffect, useState } from 'react'
import { Button } from '../library'
import logic from '../../logic'
import './Header.css'

export default function Header({ view, onHomeClick, onLoggedOut, onProfileClick }) {
    const [name, setName] = useState(null)

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName((error, name) => {
                        if (error) {
                            alert(error.mesage)
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
        event.preventDefault()

        onHomeClick()
    }

    const handleProfileClick = event => {
        event.preventDefault()

        onProfileClick()
    }

    const handleLogout = () => {
        if (confirm('Logout?')) {
            logic.logoutUser()

            onLoggedOut()
        }
    }

    return <header className="Header">
        <h1>{view === 'new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

        {name && <a href="" onClick={handleProfileClick}><h3>{name}</h3></a>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>

}

