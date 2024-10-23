import './Footer.css'

// import { Button } from '../library'

function Footer({ onNewPostClick, view }) {
    return <footer className="Footer">
        {view === 'home' &&
            <button type="button" onClick={onNewPostClick}>+</button>}

    </footer>
}

export default Footer