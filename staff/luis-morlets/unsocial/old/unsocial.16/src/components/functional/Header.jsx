import { Button } from '../library'

import logic from '../../logic'

import './Header.css'

export default ({ view, onHomeClick, onLoggedOut }) => {

    console.log('Header -> render')
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

        const confirmLogout = window.confirm('Are you sure you want to logout?')

        if (confirmLogout) {
            logic.logoutUser()
            onLoggedOut()
        }

    }

    return <header className="Header">
        <div className="title">
            <img src="\src\public\win-transformed.png" alt="unsocial logo" />
            <h1>{view === 'new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>
        </div>

        <div className="profile">
            {logic.isUserLoggedIn() && <h3>{name}</h3>}

            {logic.isUserLoggedIn() && <Button type="button" className="logout" onClick={handleLogout}>Logout</Button>
            }</div>
    </header>
}