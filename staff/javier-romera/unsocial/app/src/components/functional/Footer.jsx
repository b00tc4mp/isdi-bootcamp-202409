import './Footer.css'

import { Button } from '../library'

export default function Footer({ onNewPostClick, view }) {
    return <footer className="Footer">
        {view === 'posts' && <Button classname="create-button" type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}