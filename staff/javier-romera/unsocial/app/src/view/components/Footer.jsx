import { useLocation } from 'react-router-dom'

import { Button } from '../library'

export default function Footer({ onNewPostClick }) {
    const location = useLocation()

    return <footer className="dark:bg-[red] flex justify-center items-center h-12 w-full bg-black bottom-0 fixed border-t border-[var(--color)]">
        {location.pathname === '/' && <Button classname="w-8 h-8 flex justify-center items-center text-2xl" type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}