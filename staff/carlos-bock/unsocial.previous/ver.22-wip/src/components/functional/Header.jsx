import {Button} from '../library'

import logic from '../../logic'

import './Header.css'

function Header({view, onHomeClick, onLoggedOut}) {
    let name

    if (logic.isUserLoggedIn())
        try {
            name = logic.getUserName()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    return <header className="Header">
        <h1>{view === 'new-post' ? <a href="" onClick={event =>{
            event.preventDefault()
            
            onHomeClick()
        }}>unSocial</a>: 'unSocial'}</h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={() => {
            logic.logoutUser()

            onLoggedOut()
       }}>Logout</Button>}

        <h4>The network you may never leave...</h4>
    </header>
}

export default Header