import { useState, useEffect } from 'react'

import dark from './dark.svg'
import light from './light.svg'

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
    return <button onClick={handleSwitchClick}><img src={theme === 'dark' ? light : dark} className="w-10 h-10" /></button>
}