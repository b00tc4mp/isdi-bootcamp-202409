import { Button } from '../library'

import './Footer.css'

export default function Footer({ onNewPostClick, view }) {

    console.log('Footer -> render')
    return <footer className="Footer">
        {view === 'posts' && <Button className="create" type="button" onClick={onNewPostClick}>➕</Button>}
    </footer>
}