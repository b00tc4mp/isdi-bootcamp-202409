import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeButton } from '.'
import { Button, Anchor } from '../library'
import logic from '../../logic'
import { errors } from 'com'
import useContext from '../useContext'

const { SystemError } = errors

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

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
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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
                logic.logoutUser()

                onLoggedOut()
            }
        }, 'warn')
    }

    console.log('Header -> render')

    return <header className={location.pathname === '/' || location.pathname === '/new-post' || location.pathname === '/search' ? 'top-0 fixed flex place-content-around items-center h-16 w-full bg-black box-border py-4 font-dela-gothic-one dark:bg-[#92FF9D] text-black' : 'top-0 p-4 fixed bg-transparent flex justify-center items-center h-16 w-full'}>

        <h1 class="tracking-[0.1875em] font-dela-gothic-one dark:text-black">{location.pathname === '/new-post' || location.pathname === '/search' ? <Anchor className="header-anchor" href=""
            onClick={handleHomeClick}>UNSOCIAL</Anchor> : 'UNSOCIAL'}</h1>

        {name && <h3 class="m-0 text-base tracking-[1px] text-[#92FF9D] font-dela-gothic-one dark:text-black">{name}</h3>}

        <ThemeButton />

        {
            logic.isUserLoggedIn() && <Button className="w-[6rem] py-[5px] px-0 bg-[#2A31FF] text-white text-[0.8rem] m-0 rounded-[20px]" type="button"
                onClick={handleLogout}>Logout</Button>
        }
    </header >
}