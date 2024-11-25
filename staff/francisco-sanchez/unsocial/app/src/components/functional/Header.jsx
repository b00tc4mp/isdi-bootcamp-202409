import { useState, useEffect } from 'react'
import { Button } from '../library'
import logic from '../../logic'
import './Header.css'
//import { Component } from 'react'
//import logo from '../../../public/logo-unsocial-sin-fondo.png'
import logo from '../../../public/unsocial.png'
import { useLocation } from 'react-router-dom'



export default function Header({ /*view*/ onHomeClick, onLoggedOut, onViewProfile }) {
    const [name, setName] = useState(null) //Aquí le decimos que cuando arranca el name es null

    const location = useLocation()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillReceiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name) {
                try {

                    logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })

                    /* logic.getUserName((error, name) => {
                        if (error) {
                            alert(error.message)
                            console.error(error)
                            return
                        }
                        setName(name)
                    }) */

                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        } else setName(null)

    }, [location.pathname]) //Ahora pasamos la dirección en la que nos encontramos en lugar del view que pasábamos antes



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


    const handleProfile = event => {
        event.preventDefault()
        onViewProfile() // Cambia la vista a 'viewProfile'
    }


    console.log('Header -> render')

    return <header className="Header">
        <img src={logo} alt='logo' id='logo' />
        {/* <h1>{view === 'new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1> */}
        <h1>{location.pathname === '/new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

        {name && <a href="" onClick={handleProfile}><h3 className="nombreUser">{name}</h3></a>}{/* Si nombre existe lo pinta, sino no.  */}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header >
}