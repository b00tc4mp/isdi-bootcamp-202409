import { useNavigate, useLocation } from 'react-router-dom'
import { UserRoundPen, AudioWaveform, MessageCircle } from 'lucide-react'
import { IconButton } from '../library'
import { useNotifications } from '../../contexts/NotificationContext'

export default function Footer() {
    const navigate = useNavigate()
    const location = useLocation()
    const { hasUnreadMessages } = useNotifications() // Consume context via hook

    // Determine active page from current path
    const getActivePage = () => {
        const path = location.pathname
        if (path === '/profile') return 'profile'
        if (path.startsWith('/people')) return 'people' // Handle people base path
        if (path.startsWith('/chat')) return 'chat' // Handle chat base path and sub-paths
        return ''
    }

    const activePage = getActivePage()

    // Navigate to the selected page
    const handlePageChange = page => { navigate(`/${page}`) }

    return (
        <nav className="flex justify-evenly py-5 bg-lightest border-t border-skin">
            {/* Profile Button */}
            <IconButton
                icon={UserRoundPen}
                onClick={() => handlePageChange('profile')}
                className={`scale-125 ${activePage === 'profile' ? 'text-pink' : 'text-dark-blue'}`}
            />

            {/* People Button */}
            <IconButton
                icon={AudioWaveform}
                onClick={() => handlePageChange('people')}
                className={`scale-125 ${activePage === 'people' ? 'text-pink' : 'text-dark-blue'}`}
            />

            {/* Chat Button with Notification Dot */}
            <div className="relative">
                <IconButton
                    icon={MessageCircle}
                    onClick={() => handlePageChange('chat')}
                    className={`scale-125 ${activePage === 'chat' ? 'text-pink' : 'text-dark-blue'}`}
                />
                {/* Notification Dot - Render conditionally */}
                {hasUnreadMessages && (
                    <span className="absolute -top-0.75 -right-0.75 h-3 w-3 rounded-full bg-light-blue ring-1 ring-lightest"></span>
                )}
            </div>
        </nav>
    )
}