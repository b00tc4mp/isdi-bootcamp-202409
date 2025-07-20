import { useLocation, Link } from 'react-router-dom'

import Button from '../library/Button.jsx'

export default function Footer({ onNewRecommendClick, onCategoriesClick, onProfileClick }) {
    console.log('Footer -> render')

    const location = useLocation()

    const handleCategoriesclick = event => {
        event.preventDefault()

        onCategoriesClick()
    }


    return <footer className='fixed bottom-0 left-0 right-0 h-15 bg-primary text-white flex items-center justify-around z-10'>
        <Link to='/'><Button className='w-12 h-10 bg-white text-primary border border-cardBorder rounded text-2xl hover:bg-primary hover:text-white '>⌂</Button></Link>

        <Button type='button' class='w-12 h-10 bg-white text-primary border border-cardBorder rounded text-3xl hover:bg-primary hover:text-white'
            onClick={handleCategoriesclick}>🔍</Button>

        <Button type='button' class='w-12 h-10 bg-white text-primary border border-cardBorder rounded text-3xl hover:bg-primary hover:text-white'
            onClick={onNewRecommendClick}>＋</Button>

        <Button type='button' class='w-12 h-10 bg-white text-primary border border-cardBorder rounded text-3xl hover:bg-primary hover:text-white'
            onClick={onProfileClick}>👨🏻</Button>



    </footer>
}

"w-12 h-10 bg-white text-primary border border-cardBorder rounded hover:bg-primary hover:text-white"
