import './Header.css'

import { Anchor, Button } from '../library'

import logic from '../../logic'

export default ({ view, onHomeClick, onLoggedOut }) => {
    // let name
    let username

    if (logic.isUserLoggedIn())
        try {
            // name = logic.getUserName()
            username = logic.getUserUsername()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }

    return <header className="Header">
        <h1>{view === 'new-post' ? <Anchor href="" onClick={event => {
            event.preventDefault()

            onHomeClick()
        }}>laicosnU</Anchor> : "laicosnU"}</h1>

        <div className="name-button">
            {logic.isUserLoggedIn() && <h3>{username}</h3>}

            {logic.isUserLoggedIn() && <Button classname="logout-button" type="button" onClick={() => {
                // if (confirm('Are you sure you want to logout?')) {
                logic.logoutUser()

                onLoggedOut()
                // }
            }}>𐢫</Button>}
        </div>
    </header>
}