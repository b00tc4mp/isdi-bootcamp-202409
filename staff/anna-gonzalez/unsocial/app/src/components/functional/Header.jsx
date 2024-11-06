import { useState, useEffect } from 'react'

import { Button, Anchor } from '../library'

import logic from '../../logic'

import './Header.css'

export default function Header({ view, onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

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

    return <header className={`Header ${view !== 'posts' && view !== 'new-post' ? 'Header--transparent' : ''}`}>

        <h1>{view === 'new-post' ? <Anchor className="header-anchor" href=""
            onClick={handleHomeClick}>UNSOCIAL</Anchor> : 'UNSOCIAL'}</h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button className="header-button" type="button"
            onClick={handleLogout}>Logout</Button>
        }
    </header >
}