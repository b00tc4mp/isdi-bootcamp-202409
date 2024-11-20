import { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { Button, Anchor } from '../library'

import logic from '../../logic'


export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)

    const location = useLocation()

    useEffect(() => {
        console.log('Header -> componentDidMount')

        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName((error, name) => {
                        if (error) {
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

        event.preventDefaul()

        onHomeClick()
    }

    const handleLogout = () => {

        const confirmLogout = window.confirm("Are you sure you want to Logout?")

        if (confirmLogout) {

            logic.logoutUser()
            onLoggedOut()
        }
    }


    console.log('Header -> render')

    return <header className="Header fixed top-0 w-full z-10 bg-[rgba(220,215,215,0.9)] p-4 h-[6%] box-border flex justify-between items-center">

        <h1 className="text-center text-black font-bold text-[inherit]"> {location.pathname === '/new-post' ? <Anchor href="" onClick={handleHomeClick}>Unsocial</Anchor> : 'Unsocial'}</h1 >

        <div className="TopNav inline-flex items-stretch flex-row px-5 py-2.5 gap-4 whitespace-nowrap">

            {name && <h3 className="w-full text-sm mx-1.5">{name}</h3>}


            {logic.isUserLoggedIn() && <Button className="text-[12px]" type="button" onClick={handleLogout}>Logout</Button>}

        </div>

    </header >

}



