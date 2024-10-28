import './Header.css'

import { Button, Anchor } from '../library'

import logic from '../../logic'



export default ({ view, onHomeClick, logOut }) => {
    let name

    if (logic.isUserLoggedIn())
        try {
            name = logic.getUserName()
        } catch (error) {
            alert(error, message)

            console.error(error)
        }

    const handleHomeClick = event => {

        event.preventDefaul()

        onHomeClick()
    }

    const handleLogout = () => {

        const confirmLogout = window.confirm("Are you sure you want to Logout?")

        if (confirmLogout) {

            logic.logoutUser()
            logOut()
        }
    }

    return <header className='Header'>

        <h1>{view === 'new-post' ? <Anchor href="" onClick={handleHomeClick}>Unsocial</Anchor> : 'Unsocial'}</h1>

        <div className='TopNav'>

            {logic.isUserLoggedIn() && <h3>{name}</h3>}


            {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}

        </div>

    </header >
}



