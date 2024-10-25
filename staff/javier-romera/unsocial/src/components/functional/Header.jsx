import './Header.css'

import { Anchor, Button } from '../library'

import logic from '../../logic'

export default ({ view, onHomeClick, onLoggedOut }) => {
    let username

    if (logic.isUserLoggedIn())
        try {
            username = logic.getUserUsername()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }

    const handleHomeClick = event => {
        event.preventDefault()

        onHomeClick()
    }

    const handleLogout = () => {
        logic.logoutUser()

        onLoggedOut()
    }

    return <header className="Header">
        <h1>{view === 'new-post' ? <Anchor href="" onClick={handleHomeClick}>laicosnU</Anchor> : "laicosnU"}</h1>

        <div className="name-button">
            {logic.isUserLoggedIn() && <h3>{username}</h3>}

            {logic.isUserLoggedIn() && <Button classname="logout-button" type="button" onClick={handleLogout}>𐢫</Button>}
        </div>
    </header>
}