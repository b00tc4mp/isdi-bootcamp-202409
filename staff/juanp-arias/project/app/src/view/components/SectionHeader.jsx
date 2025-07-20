import { useState, useEffect } from 'react'
import logic from '../../logic'
import logo from '../../assets/logo.png'
import useContext from '../useContext'

export default function SectionHeader({ sectionName, loadUserName, text }) {
    const [name, setName] = useState(null)
    const { alert } = useContext()

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then((username) => {
                            setName(username)

                            if (loadUserName) { loadUserName(username) }
                        })
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
        } else setName(null)
    }, [])

    return <header className='bg-blue-100 dark:bg-gray-800 p-6 pb-0 flex items-center justify-between'>
        <div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>My <span className='text-sky-500'>{sectionName}</span></h1>
            <p className='text-m text-gray-500 dark:text-gray-400'>{name}</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>{text}</p>
        </div>
        <img src={logo} alt='profile' className='h-32 w-32 rounded-full' />
    </header>
}