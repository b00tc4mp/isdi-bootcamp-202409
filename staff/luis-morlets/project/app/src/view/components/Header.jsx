import { useEffect, useState } from 'react'

import logic from '../../logic'

import { errors } from 'com'
import { useLocation } from 'react-router-dom'
import useContext from '../useContext'

const { SystemError } = errors

export default function Header({ onLoggedOut }) {
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

    return <header className="flex items-center justify-start bg-transparent fixed w-screen h-20 left-20 top-5" >

        <div className="flex justify-end gap-4 items-end bg-[red]">
            {username && <h2 className='text-black text-4xl'>{username}</h2>}
        </div>
    </header>
}