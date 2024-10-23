import './Header.css'

import { Button } from '../library'
import logic from '../../logic'

function Header({ view, onHomeClick, onLoggedOut }) {
    let name //Para el nombre del usuario

    if (logic.isUserLoggedIn())

        try {
            name = logic.getUserName()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    return <header className="Header">
        <img src='../../public/logo-unsocial-sin-fondo.png' alt='logo' id='logo' />
        <h1>{view === 'new-post' ? <a href="" onClick={event => {
            event.preventDefault()

            onHomeClick()
        }}>Unsocial</a> : 'Unsocial'}</h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={() => {
            logic.logoutUser()
            onLoggedOut()
        }}></Button>}
    </header>
}

export default Header