import { Button } from '../library'

import logic from '../../logic'

import './Header.css'

function Header({ view, onHomeClick, onLoggedOut }) {

    let name

    if (logic.isUserLoggedIn())
        try {
        name = logic.getUserName()
        } catch (error){
            alert(error.message)

            console.error(error)
        }    
    return <header className="Header">
        <h1>{view === 'new-post' ? <a href="" onClick={event => {
            event.preventDefault() 
            
            onHomeClick()
        }}>Unsocial</a> : 'Unsocial'}</h1>

        <div className="TopNav">
            
            {logic.isUserLoggedIn() && <h3>{name}</h3>}

            {logic.isUserLoggedIn() && <Button type="button" className="Button" onClick={()=> {
            logic.logoutUser()

            onLoggedOut()
            }}>Logout</Button>
            }
        </div>
    </header>
}

export default Header