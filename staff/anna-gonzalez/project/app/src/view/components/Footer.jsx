import logic from '../../logic'

export default function Footer({ onCalendarClick, onHomeClick, onTipsClick, onReportsClick }) {
    const handleHome = () => {
        onHomeClick()
    }

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
        {logic.isUserLoggedIn() && <footer className="fixed bottom-0 left-0 w-full flex flex-row items-center justify-evenly z-50 text-[var(--text-color-light)] bg-[var(--back-color-dark)] py-3 px-4">
            <img onClick={handleHome} src="/images/home.svg" className="w-10 cursor-pointer" />
            <img onClick={handleTips} src="/images/tips.svg" className="w-10 cursor-pointer" />
            <img onClick={handleCalendar} src="/images/calendar.svg" className="w-10 cursor-pointer" />
            <img onClick={handleReports} src="/images/reports.svg" className="w-10 cursor-pointer" />
        </footer>}
    </>
}