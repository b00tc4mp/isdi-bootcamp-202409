import './Footer.css'

import Button from '../library/Button'

export default ({ onNewPostClick, view }) => {
    console.log('Footer -> render')

    return <footer className={"Footer " + (view !== 'posts' ? 'Footer--transparent' : '')}>
        {view === 'posts' && <Button className="footer-button" type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}