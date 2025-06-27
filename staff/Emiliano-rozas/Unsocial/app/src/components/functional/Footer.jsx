import { useLocation } from 'react-router-dom'

import Button from '../library/Button'

export default function Footer({ onNewPostClick }) {
    console.log('Footer-> render')

    const location = useLocation()

    return <footer className="flex justify-center p-0.5 fixed bottom-0 z-50 w-full bg-orange-50 bg-opacity-90	">
        <div>
            {location.pathname === '/' && <Button type="button" onClick={onNewPostClick}>➕</Button>}
        </div>
    </footer>
}
