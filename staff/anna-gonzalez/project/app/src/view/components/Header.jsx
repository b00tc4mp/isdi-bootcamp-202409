import { Button } from '../library'
import logic from '../../logic'

export default function Header({ onLoggedOut }) {
    const handleLogout = () => {
        logic.logoutUser()

        onLoggedOut()
    }

    return <header className="fixed top-0 left-0 w-full flex flex-row items-center justify-between z-50">
        <h2>period</h2>

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
}