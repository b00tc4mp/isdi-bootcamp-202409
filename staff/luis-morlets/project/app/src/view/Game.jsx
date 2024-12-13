import { CreateParty } from './components'

export default function Game() {
    console.log('Game -> render')

    return <main className="game-container">
        <CreateParty
        />
    </main>
}