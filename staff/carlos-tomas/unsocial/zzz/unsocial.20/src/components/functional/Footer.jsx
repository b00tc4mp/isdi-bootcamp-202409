import './Footer.css'

import Button from '../library/Button'

export default ({ onNewPostClick, view }) => {
    console.log('Fotter-> render')

    return <footer className="Footer">
        {view === 'home' && <Button type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}

