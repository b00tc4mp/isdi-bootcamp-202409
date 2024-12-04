import { Button } from "../library"

import logic from "../../logic"


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

    return <header className="Header bg-yellow-500 text-white shadow-md">
        <h1 className="text-3xl font-bold"><a href="" onClick={handleHomeClick}>Dive & Discover</a></h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
}