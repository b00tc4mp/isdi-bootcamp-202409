import { useEffect, useState } from 'react'

import logic from '../../../logic'

export default function useController() {
    const [characters, setCharacters] = useState(null)
    const [answers, setAnswers] = useState(null)
    const [conditions, setConditions] = useState(null)
    const [showBoard, setShowBoard] = useState(false)
    const [showGuessingDiv, setShowGuessingDiv] = useState(false)
    const [didWin, setDidWin] = useState(false)

    useEffect(() => {
        if (!characters && logic.isUserLoggedIn()) {
            const executeMain = async () => {
                try {
                    await main()
                } catch (error) {
                    console.error('Error executing main:', error)
                }
            }

            executeMain()
        }
    }, [didWin])

    async function main() {
        try {
            let characters = await logic.getAllCharacters()
            setCharacters(characters)

            do {
                let conditions = await logic.getRandomConditions()

                // let checkedAnswers = solveBoard(characters, conditions)
                let checkedAnswers = '112 ayuda porfavor'

                if (checkedAnswers !== null) {
                    setAnswers(checkedAnswers)
                    setConditions(conditions)
                    setShowBoard(true)
                    break
                }
            } while (answers === null)
        } catch (error) {
            console.error('Error:', error)
        }
    }

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
        conditions,

        handleGridClick,
        handleGridGuessingExit
    }
}