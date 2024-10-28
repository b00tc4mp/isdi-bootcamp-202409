import { Button } from '../library'

import logic from '../../logic'

import './Header.css'


export default ({ view, onHomeClick, onLoggedOut, onProfileClick }) => {

    let name

    if (logic.isUserLoggedIn()) {
        try {

            name = logic.getUserName()

        } catch (error) {

            alert(error.message)

            console.error(error)
        }
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

    const onProfile = (event) => {
        event.preventDefault()

        onProfileClick()
    }


    return <header className="Header">
        <h1>{view === 'new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

        {logic.isUserLoggedIn() && <a href='' style={{ fontSize: 'medium' }} onClick={onProfile}>{name}</a>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
}