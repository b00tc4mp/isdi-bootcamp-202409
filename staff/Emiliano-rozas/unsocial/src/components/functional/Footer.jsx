import './Footer.css'

import Button from '../library/Button'

export default ({ onNewPostClick, view }) => {
    console.log('Footer-> render')

    return <footer className="footer">
        <div>
            {view === 'home' && <Button type="button" onClick={onNewPostClick}>➕</Button>}
        </div>
    </footer>
}
