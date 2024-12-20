import { Navigation } from '../library'
import logic from '../../logic'

export default function Footer(props) {
    return <footer className='fixed bottom-0 left-0 w-full bg-blue-500 dark:bg-gray-800 text-white dark:text-gray-200 py-2'>
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
            {logic.isUserRoleTeacher() &&
                <Navigation to='/groups'>
                    <span>👨‍👩‍👧‍👦</span>
                    <span>Groups</span>
                </Navigation>}
            {logic.isUserRoleStudent() &&
                <Navigation to='/tasks'>
                    <span>🔔</span>
                    <span>Tasks</span>
                </Navigation>}
            <Navigation to='/profile'>
                <span>🙍</span>
                <span>Profile</span>
            </Navigation>
        </div>
    </footer>
}