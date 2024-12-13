import { useNavigate } from 'react-router-dom'

import logic from '../../logic'

import { CharacterCarousel, Stats } from '.'
import { useState } from 'react'
import useContext from '../useContext'

export default function CreateParty() {
    console.log('CreateParty -> render')

    const navigate = useNavigate()

    const { alert } = useContext()

    const handleQuitClick = () => navigate('/')

    const [selectedCharacter, setSelectedCharacter] = useState(null)

    const handleCharacterChange = (character) => {
        setSelectedCharacter(character)
    }

    const handleOnSelected = async () => {
        try {
            const playerState = await logic.getPlayerState()

            if (playerState.characters.length >= 4) {
                alert('Party is full! You cannot add more characters.', 'error')
                return
            }

            const character = await logic.getCharacterById(selectedCharacter._id)

            await logic.createParty(playerState._id, character._id)

            alert('character added', 'success')
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleStartAdventure = () => navigate('/adventure')

    return <main className="relative w-full h-full flex justify-center items-center">
        <div className="flex bg-[url('/images/background2.png')] h-[95%] relative bg-cover w-[95%] border-orange-900 border-8 p-4">

            <CharacterCarousel onCharacterChange={handleCharacterChange} onQuitClick={handleQuitClick} onSelect={handleOnSelected} onStartAdventure={handleStartAdventure} />

            {selectedCharacter && <Stats
                key={selectedCharacter.id}
                character={selectedCharacter}
            />}
        </div>
    </main>
}