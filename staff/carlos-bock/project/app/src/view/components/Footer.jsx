import { useLocation, Link } from 'react-router-dom'

import Button from '../library/Button.jsx'

export default function Footer({ onNewRecommendClick, onCategoriesClick }) {
    console.log('Footer -> render')

    const location = useLocation()

    const handleCategoriesclick = event => {
        event.preventDefault()

        onCategoriesClick()
    }


    return <footer className="footer">
        <Link to='/'><Button>⌂</Button></Link>

        <Button type='button'
            onClick={handleCategoriesclick}>🔍</Button>

        <Button type='button'
            onClick={onNewRecommendClick}>➕</Button>

        <Link to='/following'><Button>🫂</Button></Link>

        <Link to='/profile/'><Button>👨🏻</Button></Link>


    </footer>
}

//dark:bg-[var(--back-color-dark)] bg-[var(--back-color)] p-4 h-12 box-border flex justify-center items-center fixed bottom-0 w-full