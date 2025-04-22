import {Button} from '../library'

import logic from '../../logic'

import './Header.css'

const Header = ({view, onHomeClick, onLoggedOut}) => {
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
        if(confirm('Logout?')) {
            logic.logoutUser()

            onLoggedOut()
        }
    }


    return <header className="Header">
        <h1>{view === 'new-post' ? <a href="" onClick={handleHomeClick}>unSocial</a>: 'unSocial'}</h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}

        <h6>The network you never leave...</h6>
    </header>
}

export default Header