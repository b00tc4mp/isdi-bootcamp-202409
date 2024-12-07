import { Navigation } from '../library'

export default function Footer(props) {
    return <footer className='fixed bottom-0 left-0 w-full bg-blue-500 text-white py-2'>
        <div className='max-w-3xl mx-auto flex justify-around text-xs'>
            <Navigation to='/notes'>
                <span>✏️</span>
                <span>Notes</span>
            </Navigation>
            <Navigation to='/calendar'>
                <span>📅</span>
                <span>Calendar</span>
            </Navigation>
            <Navigation to='/home'>
                <span>🏠</span>
                <span>Home</span>
            </Navigation>
            <Navigation to='/alerts'>
                <span>🔔</span>
                <span>Alerts</span>
            </Navigation>
            <Navigation to='/profile'>
                <span>🙍</span>
                <span>Profile</span>
            </Navigation>
        </div>
    </footer>
}