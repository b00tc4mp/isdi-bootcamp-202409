import { useEffect, useState } from 'react'
import { errors } from 'com'
import logic from '../logic'
import useContext from './useContext'
import { Button } from './components/library'

const { SystemError } = errors

export default function Play({ onQuitClick, onNewAdventure, onContinue }) {
    const { confirm, alert } = useContext()

    const [continueButton, setContinueButton] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const playerState = await logic.getPlayerState()

                setContinueButton(!!playerState)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const handleQuitClick = () => {
        confirm('Are you sure you want to quit the game? You will also logout.', accepted => {
            if (accepted) {
                logic.logoutPlayer()

                onQuitClick()
            }
        }, 'warn')
    }

    const handleContinueButton = event => {
        event.preventDefault()

        onContinue()
    }

    const handleNewAdvClick = event => {
        event.preventDefault()

        confirm('You are about to start a new adventure, old data will be deleted.', async (accepted) => {
            if (accepted) {
                try {
                    await logic.createPlayerState()

                    await logic.getPlayerState()

                    onNewAdventure()

                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        }, 'warn')
    }

    return <main className="flex flex-col items-center justify-center h-screen w-screen bg-cover bg-center gap-24" style={{ backgroundImage: "url('/images/cursed.jpg')" }}>

        <img src="/images/Maintitle.png" alt="legend of the cursed kigndom title" className="self-center" />

        <div className="flex flex-col gap-4 items-center w-[15%]">

            {continueButton && <Button className="bg-red-700 text-white text-2xl px-6 py-2 rounded-md border-4 border-black shadow-lg transform transition-transform hover:scale-105 hover:bg-red-800 active:bg-red-600 w-full" onClick={handleContinueButton}>Continue</Button>}

            <Button onClick={handleNewAdvClick} className="bg-red-700 text-white text-2xl px-6 py-2 rounded-md border-4 border-black shadow-lg transform transition-transform hover:scale-105 hover:bg-red-800 active:bg-red-600 w-full ">New Adventure</Button>

            <Button className="bg-red-700 text-white text-2xl px-6 py-2 rounded-md border-4 border-black shadow-lg transform transition-transform hover:scale-105 hover:bg-red-800 active:bg-red-600 w-full">Settings</Button>

            {logic.isPlayerLoggedIn() && <Button onClick={handleQuitClick} className="bg-red-700 text-white text-2xl px-6 py-2 rounded-md border-4 border-black shadow-lg transform transition-transform hover:scale-105 hover:bg-red-800 active:bg-red-600 w-full">Quit</Button>}
        </div>
    </main>
}