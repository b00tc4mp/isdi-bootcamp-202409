import logic from '../../logic'
import { ConfigurationIcon, LogoutIcon, BackHomeIcon } from '../icons'
import useContext from '../useContext'

export default function Header({ onLoggedOut, configurationClick, backHomeClick }) {
    const { confirm } = useContext()

    const onConfigurationClick = event => {
        event.preventDefault()
        configurationClick()
    }
    const onBackHomeClick = event => {
        event.preventDefault()
        backHomeClick()
    }

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()
                onLoggedOut()
            }
        }, 'warn')
    }
    return <header className='flex items-center justify-between bg-white shadow-md fixed w-full px-2'>
        <div className='flex items-center'>
            {logic.isUserLoggedIn() && <BackHomeIcon onClick={onBackHomeClick} />}
        </div>
        <div className='flex items-center'>
            {logic.isUserLoggedIn() && <ConfigurationIcon onClick={onConfigurationClick} />}
            {logic.isUserLoggedIn() && <LogoutIcon onClick={handleLogout} />}
        </div>
    </header>
}