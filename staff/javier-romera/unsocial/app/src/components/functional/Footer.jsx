import './Footer.css'

import { Button } from '../library'

export default ({ onNewPostClick, view }) => {
    return <footer className="Footer">
        {view === 'home' && <Button classname="create-button" type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}