import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Anchor } from '../library'
import logic from '../../logic'
import { errors } from 'com'

const { SystemError } = errors

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillReceiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name)
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
        } else setName(null)
    }, [location.pathname])

    const handleHomeClick = event => {
        event.preventDefault()

        onHomeClick()
    }

    const handleLogout = () => {
        if (confirm('Logout?')) {
            logic.logoutUser()

            onLoggedOut()
        }
    }

    console.log('Header -> render')

    return <header className={location.pathname === '/' || location.pathname === '/new-post' || location.pathname === '/search' ? 'top-0 fixed flex place-content-around items-center h-16 w-full bg-black box-border py-4 font-dela-gothic-one' : 'top-0 p-4 fixed bg-transparent text-white flex justify-center items-center h-16 w-full'}>

        <h1 class="tracking-[0.1875em] font-dela-gothic-one">{location.pathname === '/new-post' || location.pathname === '/search' ? <Anchor className="header-anchor" href=""
            onClick={handleHomeClick}>UNSOCIAL</Anchor> : 'UNSOCIAL'}</h1>

        {name && <h3 class="m-0 text-base tracking-[1px] text-[#92FF9D] font-dela-gothic-one">{name}</h3>}

        {
            logic.isUserLoggedIn() && <Button className="header-button" type="button"
                onClick={handleLogout}>Logout</Button>
        }
    </header >
}