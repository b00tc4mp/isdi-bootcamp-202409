import './Footer.css'
import { useLocation } from 'react-router-dom'
import Button from '../library/Button'

export default function Footer({ onNewPostClick }) {

    const location = useLocation()
    return <footer className="Footer">
        {location.pathname === '/' && <Button type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}

