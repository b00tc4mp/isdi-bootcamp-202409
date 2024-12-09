import { useEffect, useState } from 'react'

import logic from '../../../logic'
import { solveBoard, validateGuess, adjustAvailableCharacters, validateAnswer } from '../../../util'

export default function useController() {
    const [characters, setCharacters] = useState(null)
    const [answers, setAnswers] = useState(null)
    const [userAnswers, setUserAnswers] = useState(Array(9))
    const [conditions, setConditions] = useState(null)
    const [index, setIndex] = useState(null)
    const [status, setStatus] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState('')
    const [showBoard, setShowBoard] = useState(false)
    const [showGuessingDiv, setShowGuessingDiv] = useState(false)
    const [availableCharacters, setAvailableCharacters] = useState([])
    const [hp, setHp] = useState(3)

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
    }, [])

    async function main() {
        try {
            let characters = await logic.getAllCharacters()
            setCharacters(characters)
            setAvailableCharacters(characters)

            do {
                let conditions = await logic.getRandomConditions()
                console.log(conditions) // TODO 🚬

                let checkedAnswers = solveBoard(characters, conditions)
                console.log(checkedAnswers) // TODO 🚬

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

        setInputValue("")
        setIsTyping(false)
        setShowGuessingDiv(false)
        setIndex(null)
    }

    const handleInputChange = event => {
        setInputValue(event.target.value)

        event.target.value ? setIsTyping(true) : setIsTyping(false)
    }

    const handleCharacterSelected = (char, currentIndex) => {
        const found = validateGuess(availableCharacters, char)

        const isCorrectAnswer = validateAnswer(char, answers, currentIndex)

        if (isCorrectAnswer) {
            const newUserAnswers = [...userAnswers]
            newUserAnswers.splice(currentIndex, 1, char)
            setUserAnswers(newUserAnswers)

            const newAvailableCharacters = adjustAvailableCharacters(found, availableCharacters)
            setAvailableCharacters(newAvailableCharacters)

            setShowGuessingDiv(false)
            setInputValue("")
            setIsTyping(false)
        }
        else {
            setShowGuessingDiv(false)
            setInputValue("")
            setIsTyping(false)

            const newHp = hp - 1
            setHp(newHp)

            if (newHp > 0) {
                setShowGuessingDiv(false)
                setInputValue("")
                setIsTyping(false)
            }
            else {
                console.log('perdiste guachin')
            }
        }
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
        availableCharacters,
        userAnswers,
        hp,

        handleGridClick,
        handleGridGuessingExit,
        handleSubmit,
        handleInputChange,
        handleCharacterSelected
    }
}