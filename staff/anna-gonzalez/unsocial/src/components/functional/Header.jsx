import { Button, Anchor } from '../library'

import logic from '../../logic'

import './Header.css'

export default ({ view, onHomeClick, onLoggedOut, className }) => { //props destructure
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

    return <header className={"Header " + (view !== 'home' && view !== 'new-post' ? className = 'Header--transparent' : '')}>
        <h1>{view === 'new-post' ? <Anchor className="header-anchor" href=""
            onClick={handleHomeClick}>UNSOCIAL</Anchor> : 'UNSOCIAL'}</h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button className="header-button" type="button"
            onClick={handleLogout}>Logout</Button>
        }
    </header >
}