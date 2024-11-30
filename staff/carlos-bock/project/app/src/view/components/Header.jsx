import { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import Button from '../library/Button.jsx'

import logic from '../../logic/index.js'

import useContext from '../useContext.js'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

    //add custom alert

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillRecieveProps')

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
                logic.logOutUser()

                onLoggedOut()
            }
        }, 'warn')
    }

    console.log('Header -> render')


    //add logic to return statment
    return <header>
        <h1>miRed</h1>

        {name && <h3>{name}</h3>}

        {logic.isUserLoggedIn() &&
            <Button type='button' onClick={handleLogout}>Cerrar sesión</Button>}
    </header>

}

