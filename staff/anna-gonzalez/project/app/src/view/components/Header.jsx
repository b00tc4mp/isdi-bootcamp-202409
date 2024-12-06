import { Anchor, Button } from '../library'
import logic from '../../logic'

import useContext from '../useContext'

export default function Header({ onLogoClick, onLoggedOut }) {
    const { alert, confirm } = useContext()

    const handleLogo = () => {
        onLogoClick()
    }

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()

                onLoggedOut()
            }
        }, 'warn')
    }

    return <>
        {logic.isUserLoggedIn() && <header className="fixed top-0 left-0 w-full flex flex-row items-center justify-between z-50 px-8 bg-[var(--back-color-light)]">
            <Anchor onClick={handleLogo}>period</Anchor>

            <Button type="Button" onClick={handleLogout}>Logout</Button>
        </header>}
    </>
}