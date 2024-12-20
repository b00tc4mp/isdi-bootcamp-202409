import { useState, useEffect } from 'react'

import toggleoff from './toggleoff.svg'
import toggleon from './toggleon.svg'

export default function ThemeButton() {
    const [theme, setTheme] = useState(localStorage.theme)
    useEffect(() => {
        if (localStorage.theme === 'dark')
            document.documentElement.classList.add('dark')
    }, [])
    const handleSwitchClick = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'

        setTheme(newTheme)
        localStorage.theme = newTheme

        if (newTheme === 'dark')
            document.documentElement.classList.add('dark')
        else
            document.documentElement.classList.remove('dark')
    }
    return <button className='text-gray-500 hover:text-gray-800' onClick={handleSwitchClick}><img src={theme === 'dark' ? toggleon : toggleoff} className='size-6' /></button>
}