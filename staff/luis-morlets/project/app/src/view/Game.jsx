import { errors } from 'com'

import { CreateParty, FirstQuest } from './components'
import { useState } from 'react'

const { SystemError } = errors

export default function Game() {
    console.log('Game -> render')

    const [view, setView] = useState('create-party')

    const handleStartAdventure = () => {
        setView('firstQuest')
    }

    return <main className="game-container">
        {view === 'create-party' && <CreateParty onStartAdventure={handleStartAdventure} />}
        {view === 'firstQuest' && <FirstQuest />}
    </main>
}