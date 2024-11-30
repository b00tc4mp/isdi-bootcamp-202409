import { useLocation } from 'react-router-dom'

import Button from '../library/Button.jsx'

export default function Footer({ onNewRecommendClick }) {
    console.log('Footer -> render')

    const location = useLocation()

    return <footer className='bg-black'>
        {location.pathname === '/' &&
            <Button type='button' onClick={onNewRecommendClick}></Button>}
    </footer>
}