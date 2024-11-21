import { useLocation } from 'react-router-dom'


import Button from '../library/Button'

export default function Footer({ onNewPostClick, }) {
    console.log('Fotter-> render')

    const location = useLocation()

    return <footer className="">
        {location.pathname === '/' && <Button type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}

