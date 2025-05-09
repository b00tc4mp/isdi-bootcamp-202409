import './Footer.css'

import { Button } from '../library'

export default ({ onNewPostClick, view }) => {

    console.log('Footer -> render')
    return <footer className="Footer">
        {view === 'home' && <Button className="create" type="button" onClick={onNewPostClick}>➕</Button>}
    </footer>
}