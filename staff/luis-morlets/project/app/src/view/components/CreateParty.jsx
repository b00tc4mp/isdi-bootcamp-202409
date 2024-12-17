import { useNavigate } from 'react-router-dom'
import { errors } from 'com'

import logic from '../../logic'

import { CharacterCarousel, Stats } from '.'
import { useEffect, useState } from 'react'
import useContext from '../useContext'

const { SystemError } = errors

export default function CreateParty({ onStartAdventure }) {
    console.log('CreateParty -> render')

    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [partySize, setPartySize] = useState(0)
    const [playerState, setPlayerState] = useState(null)


    const { alert } = useContext()
    const navigate = useNavigate()

    const handleQuitClick = () => navigate('/')

    useEffect(() => {
        (async () => {
            try {
                const playerState = await logic.getPlayerState()

                setPlayerState(playerState)
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })()
    }, [partySize])

    const handleCharacterChange = (character) => {
        setSelectedCharacter(character)
    }

    const handleOnSelected = async () => {
        try {
            if (partySize < 4) {
                const character = await logic.getCharacterById(selectedCharacter._id)

                await logic.createParty(playerState._id, character._id)

                setPartySize(partySize + 1)

                alert('character added', 'success')
            }
        } catch (error) {
            throw new SystemError(error.message)
        }
    }

    const handleStartAdventure = () => onStartAdventure()

    return <main className="relative w-full h-full flex justify-center items-center">
        <div className="flex bg-[url('/images/background2.png')] h-[95%] relative bg-cover w-[95%] border-orange-900 border-8 p-4">

            {<CharacterCarousel onCharacterChange={handleCharacterChange} onQuitClick={handleQuitClick} onSelect={handleOnSelected} onStartAdventure={handleStartAdventure} />}

            {selectedCharacter && <Stats
                key={selectedCharacter.id}
                character={selectedCharacter}
            />}
        </div>
    </main>
}