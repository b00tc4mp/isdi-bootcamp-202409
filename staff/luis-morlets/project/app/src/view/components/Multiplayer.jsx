import logic from '../../logic'
import useContext from '../useContext'

export default function Play({ onQuitClick }) {
    const { confirm } = useContext()

    const handleQuitClick = event => {
        confirm('Are you sure you want to quit to main menu?', accepted => {
            if (accepted) {
                event.preventDefault()

                onQuitClick()
            }
        }, 'warn')
    }

    return <main className="flex flex-col items-center justify-center h-screen w-screen bg-cover bg-center gap-24" style={{ backgroundImage: "url('/images/cursed.jpg')" }}>

        <img src="/images/Maintitle.png" alt="legend of the cursed kigndom title" className="self-center" />

        <div className="text-4xl flex flex-col bg-black justify-center items-center">

            <button>Continue</button>
            <button>Create Lobby</button>
            <button>Settings</button>
            {logic.isPlayerLoggedIn() && <button onClick={handleQuitClick}>Quit</button>}
        </div>
    </main>
}