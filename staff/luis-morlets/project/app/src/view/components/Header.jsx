import { useEffect, useState } from 'react'

import logic from '../../logic'

import { errors } from 'com'
import { useLocation } from 'react-router-dom'
import useContext from '../useContext'

const { SystemError } = errors

export default function Header() {
    const [username, setUsername] = useState(null)

    const location = useLocation()

    const { alert } = useContext()

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

    return <header className="flex items-center justify-start bg-transparent fixed w-screen h-20 left-20 top-5 z-10" >

        <div>
            {username && <h2 className="bg-red-700 text-white text-2xl px-4 py-1 rounded-md shadow-lg">{username}</h2>}
        </div>
    </header>
}