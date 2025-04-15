import { useNavigate, useLocation } from 'react-router-dom'
import { UserRoundPen, AudioWaveform, MessageCircle } from 'lucide-react'

export default function Footer() {
    const navigate = useNavigate()
    const location = useLocation()

    // Determine active page from current path
    const getActivePage = () => {
        const path = location.pathname
        if (path === '/profile') return 'profile'
        if (path === '/people') return 'people'
        if (path === '/chat') return 'chat'
        return ''
    }

    const activePage = getActivePage()

    // Navigate to the selected page
    const handlePageChange = page => {
        navigate(`/${page}`)
    }

    return (
        <nav className="flex justify-evenly py-5 bg-lightest border-t border-skin">
            <button
                onClick={() => handlePageChange('profile')}
                className={`flex flex-col items-center justify-center scale-125 ${activePage === 'profile' ? 'text-pink' : 'text-dark-blue'}`}
            >
                <UserRoundPen size={24} />
            </button>
            <button
                onClick={() => handlePageChange('people')}
                className={`flex flex-col items-center justify-center scale-125 ${activePage === 'people' ? 'text-pink' : 'text-dark-blue'}`}
            >
                <AudioWaveform size={24} />
            </button>
            <button
                onClick={() => handlePageChange('chat')}
                className={`flex flex-col items-center justify-center scale-125 ${activePage === 'chat' ? 'text-pink' : 'text-dark-blue'}`}
            >
                <MessageCircle size={24} />
            </button>
        </nav>
    )
}