import './Footer.css'

import Button from '../library/Button'

const Footer = ({onNewPostClick, view}) => {
    return <footer className="Footer">
        {view === 'home' && <Button type= 'button'onClick={onNewPostClick}>+</Button>}
    </footer>
}

export default Footer