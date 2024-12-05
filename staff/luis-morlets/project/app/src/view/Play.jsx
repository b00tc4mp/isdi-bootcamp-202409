import { Link, Route, Routes } from 'react-router-dom'
import { Singleplayer, Multiplayer } from './components'
import useContext from './useContext'
import logic from '../logic'

export default function Play({ onLoggedOut }) {
    console.log('Play -> render')

    const { confirm } = useContext()

    const handleLogout = () => {
        confirm('Are you sure you want to logout?', accepted => {
            if (accepted) {
                logic.logoutPlayer()

                onLoggedOut()
            }
        }, 'warn')
    }

    return <main className="flex flex-col items-center justify-center h-screen w-screen bg-cover bg-center gap-24" style={{ backgroundImage: "url('/images/cursed.jpg')" }}>

        <img src="/images/Maintitle.png" alt="legend of the cursed kigndom title" className="self-center" />

        <div className="text-4xl flex flex-col bg-black justify-center items-center">
            <Link to="singleplayer">Singleplayer</Link>
            <Link to="multiplayer">Multiplayer</Link>
            <button>Settings</button>
            {logic.isPlayerLoggedIn() && <button onClick={handleLogout}>Logout</button>}

            <Routes>
                <Route path='singleplayer' element={<Singleplayer />}></Route>
                <Route path='multiplayer' element={<Multiplayer />}></Route>
            </Routes>
        </div>
    </main>
}