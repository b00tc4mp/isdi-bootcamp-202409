import './Footer.css'

import Button from '../library/Button'

export default ({ onNewPostClick, view }) => {
    return <footer className={"Footer " + (view !== 'home' ? 'Footer--transparent' : '')}>
        {view === 'home' && <Button className="footer-button" type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}