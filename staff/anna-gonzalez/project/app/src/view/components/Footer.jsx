import { Anchor } from '../library'
import logic from '../../logic'

export default function Footer({ onCalendarClick, onTipsClick, onReportsClick }) {
    const handleTips = () => {
        onTipsClick()
    }

    const handleCalendar = () => {
        onCalendarClick()
    }

    const handleReports = () => {
        onReportsClick()
    }

    return <>
        {logic.isUserLoggedIn() && <footer className="fixed bottom-0 left-0 w-full flex flex-row items-center justify-around z-50 text-[var(--text-color-light)] bg-[var(--back-color-dark)] py-3 px-4">
            <Anchor onClick={handleTips}>Tips</Anchor>
            <Anchor onClick={handleCalendar}>Calendar</Anchor>
            <Anchor onClick={handleReports}>Reports</Anchor>
        </footer>}
    </>
}