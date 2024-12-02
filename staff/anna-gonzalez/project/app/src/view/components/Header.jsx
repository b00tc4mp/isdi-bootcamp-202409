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

    return <>
        {logic.isUserLoggedIn() && <header className="fixed top-0 left-0 w-full flex flex-row items-center justify-between z-50 px-8 bg-[var(--back-color-light)]">
            <Anchor onClick={handleLogo}>period</Anchor>

            <Button type="Button" onClick={handleLogout}>Logout</Button>
        </header>}
    </>
}