import './Footer.css'

import Button from '../library/Button'

function Footer({ onNewPostClick, view }) {
    return <footer className="Footer">
        {view === 'home' && <Button className="footer-button" type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}

export default Footer