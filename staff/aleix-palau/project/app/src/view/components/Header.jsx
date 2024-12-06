import { useState, useEffect } from 'react'

// import { useLocation } from 'react-router-dom'

import { Button } from '../library'

import logic from '../../logic'

import useContext from '../useContext'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    // const location = useLocation()

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
    }, [])

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

    console.log('Header -> render')

    return <header className="flex justify-end">
        <h1 className="m-0">
            <a href="" onClick={handleHomeClick}>Heartbeat</a>
        </h1>

        {name && <h3 className="">{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
}