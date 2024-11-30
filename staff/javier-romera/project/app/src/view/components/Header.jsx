import logic from '../../logic'
import { Button } from '../library'

export default function Header(props) {
    const handleLoginClick = () => {
        event.preventDefault()

        props.onLoginClick()
    }

    const handleRegisterClick = () => {
        event.preventDefault()

        props.onRegisterClick()
    }

    const handleHomeClick = event => {
        event.preventDefault()

        props.onHomeClick()
    }

    const handleLogoutUser = () => {
        logic.logoutUser()

        props.onLoggedOut()
    }

    return <header className="fixed top-0 w-full flex justify-center items-center bg-[red] h-[10rem] box-border">
        <div className="grid grid-cols-3">
            <div></div> {/*Chapuza o historia? */}

            <div className="w-[450px] flex justify-center items-center">
                <img onClick={handleHomeClick} src="/images/allpiece.png" alt="allpiece" className="cursor-pointer"></img>
            </div>

            <div className="flex justify-end items-center">
                {logic.isUserLoggedIn() ? <Button onClick={handleLogoutUser}>logout</Button> : <div><Button onClick={handleLoginClick}>login</Button> <Button onClick={handleRegisterClick}>register</Button></div>}
            </div>
        </div>
    </header>
}