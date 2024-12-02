import logic from '../../logic'

export default function Header({ onProfileClick, onSettingsClick, onLoginClick, onLoggedOut }) {
    const handleProfileClick = () => onProfileClick()

    const handleSettingsClick = () => onSettingsClick()

    const handleLoginClick = () => onLoginClick()

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()

                onLoggedOut()
            }
        }, 'warn')
    }

    return <header>

        <button type="button" onClick={handleSettingsClick}>Settings</button>

        {logic.isUserLoggedIn() && <button type="button" onClick={handleProfileClick}>Profile</button>}

        {!logic.isUserLoggedIn() && <button type="button" onClick={handleLoginClick}>Login</button>}

        {logic.isUserLoggedIn() && <button type="button" onClick={handleLogout}>Logout</button>}
    </header>
}