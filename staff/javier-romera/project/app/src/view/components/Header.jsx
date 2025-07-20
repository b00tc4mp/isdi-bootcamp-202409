import logic from '../../logic'
import { Button } from '../library'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { errors } from 'com'
const { SystemError } = errors

import useContext from '../useContext'

export default function Header(props) {
    const [username, setUsername] = useState(null)

    const location = useLocation()

    const { alert, confirm } = useContext()

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
    }, [location.pathname, localStorage.token, props.profileView])

    const handleLoginClick = () => {
        props.onLoginClick()
    }

    const handleRegisterClick = () => {
        props.onRegisterClick()
    }

    const handleHomeClick = () => {
        props.onHomeClick()
    }

    const handleUsernameClick = () => {
        props.setProfileView(true)
    }

    const handleLogoutUser = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()
                setUsername()

                props.onLoggedOut()
            }
        }, 'warn')
    }

    return <header className="fixed top-0 w-full h-[10rem] box-border bg-gradient-to-b from-white/90 to-white/0 z-10 flex">
        <div className="min-w-[300px] max-w-[450px] absolute left-1/2 transform -translate-x-1/2">
            <img onClick={handleHomeClick} src="/images/allpiece.png" alt="allpiece" className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"></img>
        </div>

        <div className="flex items-center justify-end ml-auto h-[132px] w-[25rem]">
            <div className="mr-[2rem]">
                {logic.isUserRoleRegular() ? <p onClick={handleUsernameClick} className="text-[1.25rem] cursor-pointer">{logic.isUserLoggedIn() && username !== null && `${username}`}</p> :
                    <p className="text-[1.25rem]">{logic.isUserLoggedIn() && username !== null && `${username}`}</p>}
            </div>
            <div className="justify-self-start mr-[3rem]">
                {logic.isUserLoggedIn && logic.isUserRoleRegular() ?
                    <Button onClick={handleLogoutUser} className="bg-[rgba(175,255,255,0.95)] w-[40px] h-[40px] border-[2px] border-[black] rounded-[.25rem] px-[.5rem] text-[1rem] transition-transform duration-100 ease-in-out hover:scale-110"><img src="/images/logout.png" /></Button> :
                    logic.isUserRoleAnonymous() && location.pathname !== "/login" && location.pathname !== "/register" &&
                    <div className="flex justify-center items-center gap-[10px]">
                        {location.pathname !== '/login' && <Button onClick={handleLoginClick} className="bg-[rgba(175,255,255,0.95)] border-[2px] border-[black] rounded-[.25rem] px-[.5rem] text-[1.125rem] transition-transform duration-100 ease-in-out hover:scale-110">Log in</Button>}
                        {location.pathname !== '/register' && <Button onClick={handleRegisterClick} className="bg-[rgba(175,255,255,0.95)] border-[2px] border-[black] rounded-[.25rem] px-[.5rem] text-[1.125rem] transition-transform duration-100 ease-in-out hover:scale-110">Sign in</Button>}
                    </div>}
            </div>
        </div>
    </header>
}