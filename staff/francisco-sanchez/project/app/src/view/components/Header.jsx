import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import useContext from '../useContext'
import logic from '../../logic'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)
    const location = useLocation()
    const { alert, confirm } = useContext()


    useEffect(() => {
        console.log('Header componentDidMount and receiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name) {
                try {
                    /* logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.error)
                            console.error(error)
                        }) */
                } catch (error) {
                    alert(error.error)
                    console.error(error)
                }
            }
        } else {
            setName(null)
        }
    }, [location.pathname])


    //Navigate to home event
    const handleHomeClick = event => {
        event.preventDefault()
        onHomeClick()
    }

    //Handle to logout aplication
    const handleLogout = event => {
        event.preventDefault()
        confirm('Are you sure you want to logout?', accepted => {
            if (accepted) {
                logic.logoutUser()
                onLoggedOut()
            }
        }, 'warn')
    }


    console.log('Header -> render')

    return <header>
        <h1 className="m-0 text-3xl">{location.pathname !== '/' ? <a href="" onClick={handleHomeClick}>Hourify</a> : 'Hourify'}</h1>

        <div className='flex justify-between'>
            <h3 className="text-2xl">The first tracker time app for everyone</h3>
            {logic.isUserLoggedIn() && <a href="" onClick={handleLogout}>Logout</a>}
        </div>


    </header>
}