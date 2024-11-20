import { useLocation } from 'react-router-dom'

import './Footer.css'

import { Button } from '../library'

export default function Footer({ onNewPostClick }) {
    const location = useLocation()

    return <footer className="Footer">
        {location.pathname === '/' && <Button classname="create-button" type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}