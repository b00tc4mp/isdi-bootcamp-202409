import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../library/Button.jsx'
import logic from '../../logic/index.js'
import useContext from '../useContext.js'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)
    const location = useLocation()
    const { alert, confirm } = useContext()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillRecieveProps')

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
                    alert(error.message)

                    console.error(error)
                }
        } else setName(null)
    }, [location.pathname])

    const handleLogout = () => {
        confirm('¿Cerrar sesión?', accepted => {
            if (accepted) {
                logic.logoutUser()

                //onLoggedOut()
            }
        }, 'warn')
    }

    console.log('Header -> render')


    return <header className='fixed top-0 left-0 right-0 h-15 bg-primary text-white flex items-center justify-between z-10 p-4 pb-6' >
        <h1 className='text-4xl font-bold'>miRed</h1>

        {name && <h3>{name}</h3>}

        {logic.isUserLoggedIn() &&
            <button className='border border-blue-600 text-white px-4 py-2 rounded bg-slate-500' type='button' onClick={handleLogout}>Cerrar sesión</button>}
    </header>

}
