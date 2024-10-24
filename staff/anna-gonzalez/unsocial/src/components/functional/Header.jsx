import { Button, Anchor } from '../library'

import logic from '../../logic'

import './Header.css'

export default ({ view, onHomeClick, onLoggedOut, className }) => {
    let name

    if (logic.isUserLoggedIn())
        try {
            name = logic.getUserName()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    return <header className={
        "Header " + (view !== 'home' && view !== 'new-post' ? 'Header--transparent' : '')
    }>
        <h1>{view === 'new-post' ? <Anchor className="header-anchor" href="" onClick={event => {
            event.preventDefault()

            onHomeClick()
        }}>UNSOCIAL</Anchor> : 'UNSOCIAL'}</h1>

        {logic.isUserLoggedIn() && <h3>{name}</h3>}

        {
            logic.isUserLoggedIn() && <Button className="header-button" type="button" onClick={() => {
                if (confirm('Are you sure to logout?')) {
                    logic.logoutUser()
                    onLoggedOut()
                }
            }}>Logout</Button>
        }
    </header >
}