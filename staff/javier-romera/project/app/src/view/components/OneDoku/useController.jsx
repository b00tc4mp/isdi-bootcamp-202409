import { useEffect, useState } from 'react'

import logic from '../../../logic'

export default function useController() {
    const [characters, setCharacters] = useState(null)
    const [showBoard, setShowBoard] = useState(false)
    const [showGuessingDiv, setShowGuessingDiv] = useState(false)
    const [didWin, setDidWin] = useState(false)

    useEffect(() => {
        if (!characters && logic.isUserLoggedIn()) {
            try {
                logic.getAllCharactersNameAndAlias()
                    .then(characters => {
                        setCharacters(characters)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }
    }, [didWin])

    const handleGridClick = () => {
        setShowGuessingDiv(true)
    }

    const handleGridGuessingExit = () => {
        if (!showGuessingDiv) return

        setShowGuessingDiv(false)
    }

    return {
        showBoard,
        showGuessingDiv,

        handleGridClick,
        handleGridGuessingExit
    }
}