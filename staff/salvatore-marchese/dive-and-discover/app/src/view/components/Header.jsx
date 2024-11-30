import { Button } from "../library"

import logic from "../../logic"

import './Header.css'

export default ({ onHomeClick, onLoggedOut }) => {
    let name 

    if (logic.isUserLoggedIn())
        try {
            name = logic.getUserName()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
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

    return <header className="Header">
        <h1><a href="" onClick={handleHomeClick}>Dive & Discover</a></h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
}