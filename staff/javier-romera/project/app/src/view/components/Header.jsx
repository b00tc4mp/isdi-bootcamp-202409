import logic from '../../logic'
import { Button } from '../library'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header(props) {
    const [username, setUsername] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!username || logic.isUserRoleRegular()) {
                try {
                    logic.getUserUsername()
                        .then(username => setUsername(username))
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
        } else setUsername(null)
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
        setUsername()

        props.onLoggedOut()
    }

    return <header className="fixed top-0 w-full flex justify-center items-center h-[10rem] box-border bg-gradient-to-b from-white/90 to-white/0 z-10">
        <div className="grid grid-cols-3">
            <div></div> {/*Chapuza o historia? */}

            <div className="w-[450px] flex justify-center items-center">
                <img onClick={handleHomeClick} src="/images/allpiece.png" alt="allpiece" className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"></img>
            </div>

            <div className="grid grid-cols-2 justify-end items-center">
                <div className="flex justify-end">
                    <p className="text-[1.25rem]">{logic.isUserLoggedIn() && username !== null && `${username}`}</p>
                </div>

                <div>
                    {logic.isUserLoggedIn && logic.isUserRoleRegular() ?
                        <Button onClick={handleLogoutUser} className="bg-[rgba(175,255,255,0.95)] border-[2px] border-[black] rounded-[.25rem] px-[.5rem] text-[1rem] transition-transform duration-100 ease-in-out hover:scale-110">Logout</Button> :
                        logic.isUserRoleAnonymous() && location.pathname !== "/login" && location.pathname !== "/register" &&
                        <div className="flex justify-center items-center gap-[10px]">
                            {location.pathname !== '/login' && <Button onClick={handleLoginClick} className="bg-[rgba(175,255,255,0.95)] border-[2px] border-[black] rounded-[.25rem] px-[.5rem] text-[1.125rem] transition-transform duration-100 ease-in-out hover:scale-110">Log in</Button>}
                            {location.pathname !== '/register' && <Button onClick={handleRegisterClick} className="bg-[rgba(175,255,255,0.95)] border-[2px] border-[black] rounded-[.25rem] px-[.5rem] text-[1.125rem] transition-transform duration-100 ease-in-out hover:scale-110">Sign in</Button>}
                        </div>}
                </div>
            </div>
        </div>
    </header>
}