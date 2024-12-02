import { useState, useEffect } from 'react'

import logic from '../logic'

import { errors } from 'com'
import { useLocation } from 'react-router-dom'
import useContext from './useContext'

const { SystemError } = errors

export default function Home({ onLoggedOut }) {
    console.log('Home -> render')

    const [username, setUsername] = useState(null)

    const location = useLocation()

    const { alert, confirm } = useContext()

    useEffect(() => {
        if (logic.isPlayerLoggedIn()) {
            if (!username)
                try {
                    logic.getPlayerUsername()
                        .then(setUsername)
                        .catch(error => {
                            if (error instanceof SystemError)
                                alert('Something went wrong, try again later.')
                            else
                                alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
        } else setUsername(null)
    }, [location.pathname])

    const handleLogout = () => {
        confirm('Are you sure you want to logout?', accepted => {
            if (accepted) {
                logic.logoutPlayer()

                onLoggedOut()
            }
        }, 'warn')
    }

    return <div className="flex justify-end gap-4 items-end">
        {username && <h2 className='text-black'>{username}</h2>}

        {logic.isPlayerLoggedIn() && <button onClick={handleLogout}>Milocodelepafuera</button>}
    </div>
}