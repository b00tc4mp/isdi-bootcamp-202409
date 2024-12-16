import { FaUser, FaUsers, FaBell, FaComments, FaCalendarAlt } from 'react-icons/fa'

export default function Footer({ activePage, setActivePage }) {
    return (
        <nav className="flex justify-around py-4 border-t bg-white">
            <button onClick={() => setActivePage('profile')} className={`flex flex-col items-center ${activePage === 'profile' ? 'text-purple-500' : ''}`}>
                <FaUser size={24} />
            </button>
            <button onClick={() => setActivePage('heartbeats')} className={`flex flex-col items-center ${activePage === 'heartbeats' ? 'text-purple-500' : ''}`}>
                <FaBell size={24} />
            </button>
            <button onClick={() => setActivePage('people')} className={`flex flex-col items-center ${activePage === 'people' ? 'text-purple-500' : ''}`}>
                <FaUsers size={24} />
            </button>
            <button onClick={() => setActivePage('chat')} className={`flex flex-col items-center ${activePage === 'chat' ? 'text-purple-500' : ''}`}>
                <FaComments size={24} />
            </button>
            <button onClick={() => setActivePage('concerts')} className={`flex flex-col items-center ${activePage === 'concerts' ? 'text-purple-500' : ''}`}>
                <FaCalendarAlt size={24} />
            </button>
        </nav>
    )
}