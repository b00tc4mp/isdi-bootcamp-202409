import { Anchor } from '../library'
import logic from '../../logic'

export default function Footer({ onProfileClick, onCalendarClick, onTipsClick, onReportsClick }) {
    const handleProfile = () => {
        onProfileClick()
    }

    const handleCalendar = () => {
        onCalendarClick()
    }

    const handleTips = () => {
        onTipsClick()
    }

    const handleReports = () => {
        onReportsClick()
    }

    return <>
        {logic.isUserLoggedIn() && <footer className="fixed bottom-0 left-0 w-full flex flex-row items-center justify-around z-50 text-[var(--text-color-light)] bg-[var(--back-color-dark)] p-4">
            <Anchor onClick={handleProfile}>Profile</Anchor>
            <Anchor onClick={handleCalendar}>Calendar</Anchor>
            <Anchor onClick={handleTips}>Tips</Anchor>
            <Anchor onClick={handleReports}>Reports</Anchor>
        </footer>}
    </>
}