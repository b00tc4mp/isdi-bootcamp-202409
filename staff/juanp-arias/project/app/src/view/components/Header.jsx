import logic from '../../logic'
import { ConfigurationIcon, LogoutIcon } from '../icons'
import useContext from '../useContext'

export default function Header({ onLoggedOut, configurationClick }) {
    const { confirm } = useContext()

    const onConfigurationClick = event => {
        event.preventDefault()
        configurationClick()
    }

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()
                onLoggedOut()
            }
        }, 'warn')
    }
    return <header className='flex text-white bg-white shadow-md min-w-full fixed justify-end pr-2'>
        {logic.isUserLoggedIn() && <ConfigurationIcon onClick={onConfigurationClick} />}
        {logic.isUserLoggedIn() && <LogoutIcon onClick={handleLogout} />}
    </header>
}
