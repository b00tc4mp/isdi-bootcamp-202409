import { useLocation } from 'react-router-dom'

import Button from '../library/Button.jsx'

export default function Footer({ onNewRecommendClick }) {
    console.log('Footer -> render')

    const location = useLocation()

    return <footer className="footer">
        <Button>⌂</Button>
        <Button>🔍</Button>
        {location.pathname === '/' &&
            <Button type='button' onClick={onNewRecommendClick}>➕</Button>}
        <Button>🫂</Button>
        <Button>👨🏻</Button>


    </footer>
}

//dark:bg-[var(--back-color-dark)] bg-[var(--back-color)] p-4 h-12 box-border flex justify-center items-center fixed bottom-0 w-full