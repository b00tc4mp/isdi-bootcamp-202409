import { Anchor, Button } from '../library'
import logic from '../../logic'

export default function Header({ onLogoClick, onLoggedOut }) {
    const handleLogo = () => {
        onLogoClick()
    }

    const handleLogout = () => {
        logic.logoutUser()

        onLoggedOut()
    }

    return <header className="fixed top-0 left-0 w-full flex flex-row items-center justify-between z-50">
        {logic.isUserLoggedIn() && <Anchor onClick={handleLogo}>period</Anchor>}

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
}