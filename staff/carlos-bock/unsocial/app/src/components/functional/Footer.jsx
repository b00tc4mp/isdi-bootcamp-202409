import './Footer.css'

import Button from '../library/Button'

export default function Footer ({onNewPostClick, view}) {
    console.log('Footer ->');

    return <footer className="Footer">
        {view === 'home' && <Button type= 'button'onClick={onNewPostClick}>+</Button>}
    </footer>
};