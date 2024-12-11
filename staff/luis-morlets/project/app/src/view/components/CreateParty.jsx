import { useNavigate } from 'react-router-dom'

import { CharacterCarousel, Stats } from '.'
import logic from '../../logic'
import images from '../../data/images'
import { useState, useEffect } from 'react'

export default function CreateParty({ character }) {
    console.log('CreateParty -> render')

    const navigate = useNavigate()

    const handleQuitClick = () => navigate('/')

    const [selectedCharacter, setSelectedCharacter] = useState(null)

    const handleCharacterChange = (character) => {
        setSelectedCharacter(character)
    }

    return <main className="relative w-full h-full flex justify-center items-center">
        <div className="flex bg-[url('/images/background2.png')] h-[95%] relative bg-cover w-[95%] border-orange-900 border-8 p-4">
            <CharacterCarousel onCharacterChange={handleCharacterChange} onQuitClick={handleQuitClick} character={character} />
            {selectedCharacter && <Stats
                key={selectedCharacter.id}
                character={selectedCharacter}
            />}
        </div>
    </main>
}