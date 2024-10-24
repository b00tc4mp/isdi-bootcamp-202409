import './Footer.css'

import Button from '../library/Button'

function Footer({ onNewPostClick, view }) {
    return <footer className="Footer">
        {view === 'home' && <Button type='button' onClick={onNewPostClick}>+</Button>}
    </footer>
}

export default Footer