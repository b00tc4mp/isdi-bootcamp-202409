import logic from '../../logic'
import { Button } from '../library'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header(props) {
    const [name, setName] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name || logic.isUserRoleRegular()) {
                try {
                    logic.getUserName()
                        .then(name => setName(name))
                        .catch(error => {
                            if (error instanceof SystemError)
                                alert('Sorry, try again later')
                            else
                                alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        } else setName(null)
    }, [location.pathname, localStorage.token])

    const handleLoginClick = () => {
        props.onLoginClick()
    }

    const handleRegisterClick = () => {
        props.onRegisterClick()
    }

    const handleHomeClick = () => {
        props.onHomeClick()
    }

    const handleLogoutUser = () => {
        logic.logoutUser()
        setName()

        props.onLoggedOut()
    }

    return <header className="fixed top-0 w-full flex justify-center items-center h-[10rem] box-border bg-gradient-to-b from-white/75 to-white/0">
        <div className="grid grid-cols-3">
            <div></div> {/*Chapuza o historia? */}

            <div className="w-[450px] flex justify-center items-center">
                <img onClick={handleHomeClick} src="/images/allpiece.png" alt="allpiece" className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"></img>
            </div>

            <div className="flex justify-end items-center">
                <p>{logic.isUserLoggedIn() && name}</p>
                {logic.isUserLoggedIn && logic.isUserRoleRegular() ?
                    <Button onClick={handleLogoutUser}>logout</Button> :
                    logic.isUserRoleAnonymous() && location.pathname !== "/login" && location.pathname !== "/register" &&
                    < div >
                        {location.pathname !== '/login' && <Button onClick={handleLoginClick}>login</Button>}
                        {location.pathname !== '/register' && <Button onClick={handleRegisterClick}>register</Button>}
                    </div>}
            </div>
        </div>
    </header>
}