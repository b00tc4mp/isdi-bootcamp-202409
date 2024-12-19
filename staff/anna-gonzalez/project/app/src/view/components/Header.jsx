import useContext from '../useContext'

import logic from '../../logic'

export default function Header({ onLogoClick, onLoggedOut }) {
    const { confirm } = useContext()

    const handleLogo = () => {
        onLogoClick()
    }

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()

                onLoggedOut()
            }
        }, '')
    }

    return <>
        {logic.isUserLoggedIn() && <header className="fixed top-0 left-0 w-full flex flex-row items-center justify-between z-50 px-4 py-2 bg-[var(--back-color-light)]">
            <img onClick={handleLogo} src="/images/logo.png" className="w-10 cursor-pointer" />

            <img onClick={handleLogout} src="/images/logout.png" className="w-8 cursor-pointer" />
        </header>}
    </>
}