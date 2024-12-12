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
        {logic.isUserLoggedIn() && <header className="fixed top-0 left-0 w-full flex flex-row items-center justify-between z-50 px-8 py-2 bg-[var(--back-color-light)]">
            <img onClick={handleLogo} src="/images/logo.png" className="w-10" />

            <img onClick={handleLogout} src="/images/logout.png" className="w-8" />
        </header>}
    </>
}