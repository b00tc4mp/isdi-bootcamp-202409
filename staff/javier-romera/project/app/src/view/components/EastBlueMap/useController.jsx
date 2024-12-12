import { useState } from 'react'
import logic from '../../../logic'

export default function useController() {
    const [characters, setCharacters] = useState(null)
    const [selectedArc, setSelectedArc] = useState(null)

    const handleLocationClicked = event => {
        const { target: { id: arc } } = event

        try {
            logic.getCharactersByArc(arc)
                .then(characters => {
                    setCharacters(characters)
                    setSelectedArc(arc)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleExitLocation = () => {
        setCharacters(null)
        setSelectedArc(null)
    }

    return {
        characters,
        selectedArc,

        handleLocationClicked,
        handleExitLocation
    }
}