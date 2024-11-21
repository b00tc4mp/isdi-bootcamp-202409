import { Button } from '../library'

import { useLocation } from 'react-router-dom'

import './Footer.css'

export default function Footer({ onNewPostClick }) {
    const location = useLocation()

    console.log('Footer -> render')
    return <footer className="Footer">
        {location.pathname === '/' && <Button className="create" type="button" onClick={onNewPostClick}>➕</Button>}
    </footer>
}