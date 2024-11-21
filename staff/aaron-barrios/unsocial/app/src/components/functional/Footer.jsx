import { useLocation } from 'react-router-dom'

import './Footer.css'

export default function Footer({ onNewPostClick }) {
    const location = useLocation()

    return <footer className="Footer">
        {location.pathname === 'posts' &&
            <button type="button" onClick={onNewPostClick}>+</button>}

    </footer>
}