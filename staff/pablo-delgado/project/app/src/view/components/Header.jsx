import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logic from '../../logic'
import useContext from '../useContext'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)
    const [showMenu, setShowMenu] = useState(false)
    const location = useLocation()
    const { alert, confirm } = useContext()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillReceiveProps')

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

    const handleHomeClick = event => {
        event.preventDefault()
        onHomeClick()
    }

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()
                onLoggedOut()
            }
        }, 'warn')
    }

    const handleLoginClick = () => {
        alert('Redirect to login (functionality pending)')
    }

    console.log('Header -> render')

    // return (
    //     <header className="dark:bg-[var(--back-color-dark)] bg-[var(--back-color)] p-4 h-12 box-border flex justify-between items-center fixed top-0 w-full">
    //         <div className="absolute top-4 right-4">
    //             <button
    //                 onClick={() => setShowMenu(!showMenu)}
    //                 className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-200"
    //             >
    //                 👤
    //             </button>
    //             {showMenu && (
    //                 <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
    //                     {logic.isUserLoggedIn() ? (
    //                         <button
    //                             onClick={handleLogout}
    //                             className="block text-left w-full px-4 py-2 hover:bg-gray-200"
    //                         >
    //                             Logout
    //                         </button>
    //                     ) : (
    //                         <button
    //                             onClick={handleLoginClick}
    //                             className="block text-left w-full px-4 py-2 hover:bg-gray-200"
    //                         >
    //                             Sign in
    //                         </button>
    //                     )}
    //                 </div>
    //             )}
    //         </div>
    //     </header>
    // )
}

export { Header }
