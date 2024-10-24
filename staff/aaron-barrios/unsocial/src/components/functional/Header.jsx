import { Button } from '../library'

import logic from '../../logic'

import './Header.css'


export default ({ view, onHomeClick, onLoggedOut }) => {

    let name

    if (logic.isUserLoggedIn()) {
        try {

            name = logic.getUserName()

        } catch (error) {

            alert(error.message)

            console.error(error)
        }
    }


    return <header className="Header">
        <h1>{view === 'new-post' ? <a href="" onClick={event => {
            event.preventDefault()

            onHomeClick()
        }}>Unsocial</a> : 'Unsocial'}</h1>

        {logic.isUserLoggedIn() && <h3 style={{ fontSize: 'medium' }}>{name}</h3>}

        {logic.isUserLoggedIn() && <Button type="button"
            onClick={() => {

                if (confirm('Logout?')) {
                    logic.logoutUser()

                    onLoggedOut()
                }

            }}>Logout</Button>}
    </header>
}