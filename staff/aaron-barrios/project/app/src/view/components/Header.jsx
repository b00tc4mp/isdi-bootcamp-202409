import logic from '../../logic'

export default function Header({ onProfileClick, onLoginClick, onLoggedOut }) {
    const handleProfileClick = () => onProfileClick()

    const handleLoginClick = () => onLoginClick()

    const handleLogout = () => {
        logic.logoutUser()

        onLoggedOut()
    }

    return <header>

        {logic.isUserLoggedIn() && <button type="button" onClick={handleProfileClick}>Profile</button>}

        {!logic.isUserLoggedIn() && <button type="button" onClick={handleLoginClick}>Login</button>}

        {logic.isUserLoggedIn() && <button type="button" onClick={handleLogout}>Logout</button>}
    </header>
}