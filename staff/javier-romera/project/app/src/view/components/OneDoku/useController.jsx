import { useEffect, useState } from 'react'

import { errors } from 'com'
const { SystemError } = errors

import logic from '../../../logic'
import { solveBoard, validateGuess, adjustAvailableCharacters, validateAnswer, didFinishBoard, getElapsedTime, calculateOneDokuScore } from '../../../util'

export default function useController() {
    const [characters, setCharacters] = useState(null)
    const [answers, setAnswers] = useState(null)
    const [userAnswers, setUserAnswers] = useState(Array(9))
    const [conditions, setConditions] = useState(null)
    const [index, setIndex] = useState(null)
    const [status, setStatus] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [showBoard, setShowBoard] = useState(false)
    const [showGuessingDiv, setShowGuessingDiv] = useState(false)
    const [availableCharacters, setAvailableCharacters] = useState([])
    const [hp, setHp] = useState(3)
    const [time, setTime] = useState(Date.now())
    const [winAlert, setWinAlert] = useState(false)
    const [loseAlert, setLoseAlert] = useState(false)

    useEffect(() => {
        if (!characters && logic.isUserLoggedIn()) {
            const executeMain = async () => {
                try {
                    await main()
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }

            executeMain()
        }

        if (!status && logic.isUserLoggedIn() && !answers)
            try {
                logic.getUserStatus()
                    .then(setStatus)
                    .catch(error => {
                        if (error instanceof SystemError)
                            alert('Sorry, try again later')
                        else
                            alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }

        if (didFinishBoard(userAnswers)) {
            const timeSpent = Date.now() - time

            const parsedTime = getElapsedTime(timeSpent)

            setTime(parsedTime)

            try {
                logic.setNewUserStatus(status, 'onedoku')
                    .catch(error => {
                        if (error instanceof SystemError)
                            alert('Sorry, try again later')
                        else
                            alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }

            const score = calculateOneDokuScore(timeSpent, hp)

            try {
                logic.updateUserScore(score)
                    .catch(error => {
                        if (error instanceof SystemError)
                            alert('Sorry, try again later')
                        else
                            alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }
    }, [userAnswers])

    async function main() {
        try {
            let characters = await logic.getAllCharacters()
            setCharacters(characters)
            setAvailableCharacters(characters)

            do {
                let conditions = await logic.getRandomConditions()

                let checkedAnswers = solveBoard(characters, conditions)

                if (checkedAnswers !== null) {
                    setAnswers(checkedAnswers)
                    setConditions(conditions)
                    setShowBoard(true)
                    break
                }
            } while (answers === null)
        } catch (error) {
            if (error instanceof SystemError)
                alert('Sorry, try again later')
            else
                alert(error.message)

            console.error(error)
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

            if (didFinishBoard(newUserAnswers)) setWinAlert(true)

            const newAvailableCharacters = adjustAvailableCharacters(found, availableCharacters)
            setAvailableCharacters(newAvailableCharacters)

            setShowGuessingDiv(false)
            setInputValue("")
            setIsTyping(false)
        } else {
            setShowGuessingDiv(false)
            setInputValue("")
            setIsTyping(false)

            const newHp = hp - 1
            setHp(newHp)

            if (newHp === 0) setLoseAlert(true)
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
    }

    const handleRefresh = () => {
        setCharacters(null)
        setAnswers(null)
        setUserAnswers(Array(9))
        setConditions(null)
        setIndex(null)
        setStatus(null)
        setInputValue('')
        setIsTyping(false)
        setShowBoard(false)
        setShowGuessingDiv(false)
        setAvailableCharacters([])
        setHp(3)
        setTime(Date.now())
        setWinAlert(false)
        setLoseAlert(false)
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
        time,
        winAlert,
        loseAlert,
        status,

        setWinAlert,
        setLoseAlert,

        handleGridClick,
        handleGridGuessingExit,
        handleSubmit,
        handleInputChange,
        handleCharacterSelected,
        handleRefresh
    }
}