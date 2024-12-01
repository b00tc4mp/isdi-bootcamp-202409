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

    return <footer className="fixed bottom-0 left-0 w-full flex flex-row items-center justify-between z-50 text-[var(--text-color-light)] bg-[var(--back-color-dark)]">
        {logic.isUserLoggedIn() && <Anchor onClick={handleProfile}>Profile</Anchor>}
        {logic.isUserLoggedIn() && <Anchor onClick={handleCalendar}>Calendar</Anchor>}
        {logic.isUserLoggedIn() && <Anchor onClick={handleTips}>Tips</Anchor>}
        {logic.isUserLoggedIn() && <Anchor onClick={handleReports}>Reports</Anchor>}
    </footer>
}