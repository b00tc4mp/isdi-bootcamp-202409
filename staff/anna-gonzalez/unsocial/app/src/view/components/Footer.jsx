import { useLocation } from 'react-router-dom'
import Button from '../library/Button'

export default function Footer({ onNewPostClick }) {
    console.log('Footer -> render')

    const location = useLocation()

    return <footer className={location.pathname !== '/' ? 'bg-transparent' : 'fixed flex justify-center items-center h-16 w-full bg-black box-border bottom-0 dark:bg-[#92FF9D]'}>
        {location.pathname === '/' && <Button className="rounded-[25px] border-0 w-12 pt-1 pb-1 text-black mt-1 bg-[#44d052] hover:bg-[#44d052] dark:bg-[#2A31FF] dark:text-white" type="button" onClick={onNewPostClick}>+</Button>}
    </footer>
}