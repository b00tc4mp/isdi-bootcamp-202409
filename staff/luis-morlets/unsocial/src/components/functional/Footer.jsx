import './Footer.css'

import { Button } from '../library'

function Footer({ onNewPostClick, view }) {
    return <footer className="Footer">
        {view === 'home' && <Button className="create" type="button" onClick={onNewPostClick}>➕</Button>}
    </footer>
}

export default Footer