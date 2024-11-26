import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../library'
import logic from '../../logic'
import './Header.css'
import useContext from '../useContext'

export default function Header({ onHomeClick, onLoggedOut, onProfileClick }) {
    const [name, setName] = useState(null)
    const { alert, confirm } = useContext()

    const location = useLocation()

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.message)
                            console.log(error)
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

    const handleProfileClick = event => {
        event.preventDefault()

        onProfileClick()
    }

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()

                onLoggedOut()
            }
        }, 'warn')
    }

    return <header className="Header flex justify-between fixed w-full">
        <h1 className='text-white text-3xl pl-[0.6rem]' >{location.pathname === '/new-post' ? <a href="" onClick={handleHomeClick} >Unsocial</a> : 'Unsocial'}</h1>

        {name && <a href="" onClick={handleProfileClick}><h3 className='text-sm pl-[7rem] pt-[0.5rem] text-white'>{name}</h3></a>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>

}

