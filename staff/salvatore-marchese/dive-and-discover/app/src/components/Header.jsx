import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "../view/library"
import logic from '../logic/users'

import { extractPayloadFromJWT } from '../util';

export default ({ onHomeClick, onLoggedOut }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      // check if a token exists
        const user = extractPayloadFromJWT(sessionStorage.token);

        if (!user) navigate('/login')
       
    }, [])

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

    return (
        <nav className="w-full px-8 py-4 bg-yellow-500 text-bg-[var(--color)] top-0 z-50">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className='flex items-center'>
                    <h1 className="text-2xl font-bold"><a href="#" onClick={handleHomeClick}>Dive & Discover</a></h1>
                </div>
                {/* Desktop Menu Items - Hidden On Mobile  */}
                <ul className="md:flex space-x-8 hidden text-base font-semibold">
                    <li><NavLink to="#" className="cursor-pointer hover:underline">Home</NavLink></li>
                    <li><NavLink to="#" className="cursor-pointer hover:underline">Search</NavLink></li>
                    <li><NavLink to="#" className="cursor-pointer hover:underline">Profile</NavLink></li>
                    <li><NavLink to="#" className="cursor-pointer hover:underline">Log Book</NavLink></li>

                    <li><Button className="ButtonLogout" type="button" onClick={handleLogout}>Logout</Button>
                    </li>
                </ul>
                {/* Mobile Nav Toggle - Hidden On Web */}
                <div className="block md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} type='button' className="text-white">
                        <span className="text-4xl font-semibold">&#8801;</span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu Items - Hidden On Web */}
            {
                isOpen && (
                    <ul className='flex flex-col gap-y-2 md:hidden sm:px-6 pb-2' id="mobile-menu-items">
                    <li><NavLink to="#" className="cursor-pointer hover:underline">Home</NavLink></li>
                    <li><NavLink to="#" className="cursor-pointer hover:underline">Search</NavLink></li>
                    <li><NavLink to="#" className="cursor-pointer hover:underline">Profile</NavLink></li>
                    <li><NavLink to="#" className="cursor-pointer hover:underline">Log Book</NavLink></li>

                    <li><Button className="ButtonLogout" type="button" onClick={handleLogout}>Logout</Button>
                    </li>
                    </ul>
                )
            }
        </nav>
    )
}

