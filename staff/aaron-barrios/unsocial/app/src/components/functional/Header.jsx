import { Button } from '../library'

import { useEffect, useState } from 'react'

import logic from '../../logic'

import './Header.css'


export default function Header({ view, onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name) {
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
            }
        } else setName(null)
    }, [view])

    const handleHomeClick = event => {
        event.preventDefault()

        onHomeClick()
    }

    const handleLogout = () => {
        if (confirm('Logout?')) {
            logic.logoutUser()

            onLoggedOut()
        }
    }

    const onProfile = (event) => {
        event.preventDefault()

        onProfileClick()
    }

    return <header className="Header">
        <h1>{view === 'new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

        {logic.isUserLoggedIn() && <a href='' style={{ fontSize: 'medium' }} onClick={onProfile}>{name}</a>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header >
}