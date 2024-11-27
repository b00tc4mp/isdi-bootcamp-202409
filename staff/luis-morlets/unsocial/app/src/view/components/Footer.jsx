import { Button } from '../library'

import { useLocation } from 'react-router-dom'

export default function Footer({ onNewPostClick }) {
    const location = useLocation()

    console.log('Footer -> render')
    return <footer className="h-10 box-border w-full fixed bottom-0 bg-[var(--back-color)] flex justify-center">
        {location.pathname === '/' && <Button className=" w-fit self-center" type="button" onClick={onNewPostClick}>➕</Button>}
    </footer>
}