import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Anchor } from '../library'
import logic from '../../logic'
import './Header.css'
import { errors } from 'com'

const { SystemError } = errors

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillReceiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name)
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
        } else setName(null)
    }, [location.pathname])

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

    console.log('Header -> render')

    return <header className={`Header ${location.pathname !== '/' && location.pathname !== '/new-post' && location.pathname !== '/search' ? 'Header--transparent' : ''}`}>

        <h1>{location.pathname === '/new-post' || location.pathname === '/search' ? <Anchor className="header-anchor" href=""
            onClick={handleHomeClick}>UNSOCIAL</Anchor> : 'UNSOCIAL'}</h1>

        {name && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button className="header-button" type="button"
            onClick={handleLogout}>Logout</Button>
        }
    </header >
}