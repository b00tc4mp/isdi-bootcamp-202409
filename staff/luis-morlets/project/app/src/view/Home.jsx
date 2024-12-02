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

    const { alert } = useContext()

    // useEffect(() => {
    //     if (logic.isUserLoggedIn()) {
    //         if (!username)
    //             try {
    //                 logic.getUsername()
    //                     .then(setUsername)
    //                     .catch(error => {
    //                         if (error instanceof SystemError)
    //                             alert('Something went wrong, try again later.')
    //                         else
    //                             alert(error.message)

    //                         console.error(error)
    //                     })
    //             } catch (error) {
    //                 alert(error.message)

    //                 console.error(error)
    //             }
    //     } else setUsername(null)
    // }, [location.pathname])

    const handleLogout = () => {
        confirm('Are you sure you want to logout?', accepted => {
            if (accepted) {
                logic.logoutUser()

                onLoggedOut()
            }
        }, 'warn')
    }

    return <div className="flex flex-col justify-center items-end">
        {username && <h2>Miloco</h2>}

        {logic.isUserLoggedIn() && <button onClick={handleLogout}>Milocodelepafuera</button>}
    </div>
}