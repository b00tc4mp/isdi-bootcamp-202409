import { useEffect, useState } from 'react'
import { Button } from "../library"
import logic from '../../../../api/logic'

export default ({ onHomeClick, onLoggedOut }) => {
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await logic.getUserName()
                setUserName(name)
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
        fetchUserName()
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
        <header className=" fixed top-0 bg-yellow-500 w-full text-blue shadow-md px-6 py-4 flex justify-between items-start overflow-hidden">
            <h1 className="text-xl font-bold">
                <a href="#" onClick={handleHomeClick}>Dive & Discover</a>
            </h1>

            {/* Only display username if user is logged in */}
            {logic.isUserLoggedIn() && <h3 className="text-sm font-medium">{userName}</h3>}

            {/* Logout button */}
            {logic.isUserLoggedIn() && (
                <Button className="ButtonLogout" type="button" onClick={handleLogout}>Logout</Button>
            )}
        </header>
    )
}