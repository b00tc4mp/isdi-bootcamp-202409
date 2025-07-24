import { useLocation } from 'react-router-dom'

import Button from '../library/Button'

export default function Footer({ onNewPostClick }) {
    console.log('Footer -> render')

    const location = useLocation()

    return <footer className="dark:bg-black dark:text-white bg-[var(--back-color)] p-4 h-12 box-border flex justify-center items-center fixed bottom-0 w-full">
        {(location.pathname === '/' || location.pathname === '/favourites') && <Button type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}