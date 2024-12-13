import logic from '../../logic'
import useContext from '../useContext'

export default function Singleplayer({ onQuitClick, onNewAdventure }) {
    const { confirm } = useContext()

    const handleQuitClick = event => {
        confirm('Are you sure you want to quit to main menu?', accepted => {
            if (accepted) {
                event.preventDefault()

                onQuitClick()
            }
        }, 'warn')
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

        <div className="text-4xl flex flex-col bg-black justify-center items-center">

            <button>Continue</button>
            <button onClick={handleNewAdvClick}>New Adventure</button>
            <button>Settings</button>
            {logic.isPlayerLoggedIn() && <button onClick={handleQuitClick}>Quit</button>}
        </div>
    </main>
}