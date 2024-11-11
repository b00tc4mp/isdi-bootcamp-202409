import { useState, useEffect } from 'react'


import './Header.css'

import { Button, Anchor } from '../library'

import logic from '../../logic'


export default function Header({ view, onHomeClick, onLoggedOut }) {

    const [name, setName] = useState(null)


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
    }, [view])


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

    return <header className='Header'>

        <h1> {view === 'new-post' ? <Anchor href="" onClick={handleHomeClick}>Unsocial</Anchor> : 'Unsocial'}</h1 >

        <div className='TopNav'>

            {name && <h3>{name}</h3>}


            {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}

        </div>

    </header >

}



