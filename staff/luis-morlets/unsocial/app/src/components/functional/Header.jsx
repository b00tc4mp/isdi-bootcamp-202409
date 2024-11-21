import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { Button } from '../library'

import logic from '../../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

    useEffect(() => {

        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName((error, name) => {
                        if (error) {
                            if (error instanceof SystemError)
                                alert('Something went wrong, try again later.')
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

        try {
            event.preventDefault()

            onHomeClick()

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLogout = () => {

        try {
            const confirmLogout = window.confirm('Are you sure you want to logout?')

            if (confirmLogout) {
                logic.logoutUser()
                onLoggedOut()
            }
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Header -> render')

    return <header className="h-14 flex box-border items-center justify-evenly fixed top-0 bg-[var(--back-color)] w-full">
        <div className=" flex items-center">
            <img className="w-14" src="\src\public\win-transformed.png" alt="unsocial logo" />
            <h1 className="text-center text-base m-0">{location.pathname === '/new-post' ? <a className="no-underline" href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>
        </div>

        <div className="flex items-center">
            {name && <h3 className="m-0 text-xxs">{name}</h3>}

            {logic.isUserLoggedIn() && <Button type="button" className=" w-fit self-end mr-1 bg-[dimgrey] border-solid rounded-md text-xs text-[lightgrey] text-center" onClick={handleLogout}>🔌</Button>
            }</div>
    </header>
}