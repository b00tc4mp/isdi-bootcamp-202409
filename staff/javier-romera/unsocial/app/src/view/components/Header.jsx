import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { Anchor, Button } from '../library'

import { errors } from 'apu'

const { SystemError } = errors

import logic from '../../logic'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

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
    }, [location.pathname])

    const handleHomeClick = event => {
        event.preventDefault()

        onHomeClick()
    }

    const handleLogout = () => {
        logic.logoutUser()

        onLoggedOut()
    }

    return <header className="Header bg-black w-full h-12 box-border flex justify-between items-center top-0 fixed border-b px-1 border-[var(--color)]">
        <h1 className="-tracking-widest">{location.pathname === '/new-post' ? <Anchor href="" onClick={handleHomeClick}>laicosnU</Anchor> : "laicosnU"}</h1>

        <div className="flex justify-center items-center">
            {name && <h3 className="-tracking-widest">{name}</h3>}

            {logic.isUserLoggedIn() && <Button classname="flex w-6 h-6 items-center justify-center border-solid border border-gray-500 ml-2" type="button" onClick={handleLogout}>𐢫</Button>}
        </div>
    </header>
}