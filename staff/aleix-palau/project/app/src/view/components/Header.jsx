import { Button } from '../library'
import logic from '../../logic'
import useContext from '../useContext'

export default function Header({ onLoggedOut }) {
    const { confirm } = useContext()

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()

                onLoggedOut()
            }
        }, 'warn')
    }

    console.log('Header -> render')

    return <header className="flex justify-between items-center px-4 py-2 bg-white border-b shadow-sm">
        <h1 className="font-bold text-lg">Heartbeat</h1>
        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header >
}