import { Button, Anchor } from '../library'

import logic from '../../logic'

import './Header.css'

function Header({ view, onHomeClick, onLoggedOut }) {
    let name

    if (logic.isUserLoggedIn())
        try {
            name = logic.getUserName()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    return <header className="Header">
        <h1>{view === 'new-post' ? <Anchor className="header-anchor" href="" onClick={event => {
            event.preventDefault()

            onHomeClick()
        }}>UNSOCIAL</Anchor> : 'UNSOCIAL'}</h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button className="header-button" type="button" onClick={() => {
            logic.logoutUser()

            onLoggedOut()
        }}>Logout</Button>}
    </header>
}

export default Header