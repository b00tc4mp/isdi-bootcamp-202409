import { useEffect, useState } from 'react'

import logic from '../../../logic'
import { solveBoard } from '../../../util'

export default function useController() {
    const [characters, setCharacters] = useState(null)
    const [answers, setAnswers] = useState(null)
    const [conditions, setConditions] = useState(null)
    const [index, setIndex] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState('')
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

            let conditions = await logic.getRandomConditions()
            setConditions(conditions)

            do {
                let conditions = await logic.getRandomConditions()
                console.log(conditions)

                let checkedAnswers = solveBoard(characters, conditions)
                console.log(checkedAnswers) // TODO erase

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

    const handleGridClick = event => {
        if (showGuessingDiv) return
        const { target: { id: index } } = event
        setIndex(index)
        setShowGuessingDiv(true)
    }

    const handleGridGuessingExit = () => {
        if (!showGuessingDiv) return

        setShowGuessingDiv(false)
        setIndex(null)
    }

    const handleInputChange = event => {
        setInputValue(event.target.value)

        event.target.value ? setIsTyping(true) : setIsTyping(false)
    }

    const handleSubmit = event => {
        event.preventDefault()
    }

    return {
        showBoard,
        showGuessingDiv,
        conditions,
        index,
        inputValue,
        isTyping,

        handleGridClick,
        handleGridGuessingExit,
        handleSubmit,
        handleInputChange
    }
}