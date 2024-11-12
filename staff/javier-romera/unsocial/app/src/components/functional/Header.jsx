import { useEffect, useState } from 'react'

import { Anchor, Button } from '../library'

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
                            if (error instanceof SystemError)
                                alert('Sorry, try again later')
                            else
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
        logic.logoutUser()

        onLoggedOut()
    }

    return <header className="Header">
        <h1>{view === 'new-post' ? <Anchor href="" onClick={handleHomeClick}>laicosnU</Anchor> : "laicosnU"}</h1>

        <div className="name-button">
            {name && <h3>{name}</h3>}

            {logic.isUserLoggedIn() && <Button classname="logout-button" type="button" onClick={handleLogout}>𐢫</Button>}
        </div>
    </header>
}