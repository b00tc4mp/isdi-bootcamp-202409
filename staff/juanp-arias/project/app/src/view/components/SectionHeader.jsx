import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logic from '../../logic'
import logo from '../../assets/logo.png'
import useContext from '../useContext'

export default function SectionHeader({ sectionName }) {
    const [name, setName] = useState(null)
    const location = useLocation()
    const { alert } = useContext()
    
    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
        } else setName(null)
    }, [location.pathname])

    return <header className='bg-blue-100 p-6 pb-0 flex items-center justify-between'>
        <div>
            <h1 className='text-3xl font-bold text-gray-900'>My <span className='text-sky-500'>{sectionName}</span></h1>
            <p className='text-m text-gray-500'>{name}</p>
        </div>
        <img src={logo} alt='profile' className='h-32 w-32 rounded-full' />
    </header>
}