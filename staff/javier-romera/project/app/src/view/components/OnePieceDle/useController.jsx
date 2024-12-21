import { useState, useEffect } from 'react'

import logic from '../../../logic'
import { errors } from 'com'

import { normalizeWords, validateGuess, adjustAvailableCharacters, checkOnePiecedleAnswer, calculateOnePieceDleScore } from '../../../util'

const { SystemError } = errors

export default function useController() {
    const [randomChar, setRandomChar] = useState(null)
    const [characters, setCharacters] = useState(null)
    const [status, setStatus] = useState(null)
    const [isFirstAnswerSent, setIsFirstAnswerSent] = useState(false)
    const [didWin, setDidWin] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [showWinAlert, setShowWinAlert] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [answers, setAnswers] = useState([])
    const [guessedCharacters, setGuessedCharacters] = useState([])
    const [availableCharacters, setAvailableCharacters] = useState([])
    const [wrongGuessMessage, setWrongGuessMessage] = useState('')

    useEffect(() => {
        if (!characters && logic.isUserLoggedIn())
            try {
                logic.getAllCharactersNameAndAlias()
                    .then(characters => {
                        setCharacters(characters)
                        setAvailableCharacters(characters)
                    })
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

        if (!randomChar && logic.isUserLoggedIn())
            try {
                logic.getRandomCharacter()
                    .then(char => {
                        setRandomChar(char)
                    })
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

        if (!status && logic.isUserLoggedIn() && !didWin)
            try {
                logic.getUserStatus()
                    .then(userStatus => {
                        setStatus(userStatus)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }

        if (didWin) {
            try {
                logic.setNewUserStatus(status, 'onepiecedle')
                    .then(() => {
                        setTimeout(() => {
                            setShowWinAlert(true)
                        }, 750)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }

            const score = calculateOnePieceDleScore(guessedCharacters.length)

            if (score !== undefined)
                try {
                    logic.updateUserScore(score)
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
        }
    }, [didWin])

    const handleInputChange = event => {
        setInputValue(event.target.value)

        event.target.value ? setIsTyping(true) : setIsTyping(false)
    }

    const handleCharacterClick = async (char) => {
        await setInputValue(char)

        document.getElementById("guess").focus()

        document.getElementById("guessButton").click()

        setIsTyping(false)
    }

    const handleGuess = (event) => {
        event.preventDefault()

        const { target: { guess: { value: guess } } } = event

        try {
            const parsedGuess = normalizeWords(guess)

            const found = validateGuess(availableCharacters, parsedGuess)

            if (found > -1) {
                setWrongGuessMessage('')

                const newAvailableCharacters = adjustAvailableCharacters(found, availableCharacters)
                setAvailableCharacters(newAvailableCharacters)

                logic.getCharacterByName(parsedGuess)
                    .then(char => {
                        const checkedAnswer = checkOnePiecedleAnswer(randomChar, char)

                        setAnswers((prevAnswers) => [...prevAnswers, checkedAnswer])
                        setGuessedCharacters((prevGuessedCharacters) => [...prevGuessedCharacters, char])

                        if (checkedAnswer[0]) setDidWin(true)

                        setInputValue("")
                        setIsTyping(false)
                        if (!isFirstAnswerSent)
                            setIsFirstAnswerSent(true)
                    })
                    .catch(error => {
                        if (error instanceof SystemError)
                            alert('Sorry, try again later')
                        else
                            alert(error.message)

                        console.error(error)
                    })
            } else {
                const found = validateGuess(characters, parsedGuess)

                if (parsedGuess !== '')
                    if (found > -1) setWrongGuessMessage('Character already guessed')
                    else setWrongGuessMessage('Character not found')
            }
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleTryGuessAfterWin = event => {
        event.preventDefault()

        setShowWinAlert(true)
    }

    const handleRefresh = () => {
        setRandomChar(null)
        setCharacters(null)
        setStatus(null)
        setIsFirstAnswerSent(false)
        setDidWin(false)
        setIsTyping(false)
        setShowWinAlert(false)
        setInputValue("")
        setAnswers([])
        setGuessedCharacters([])
        setAvailableCharacters([])
        setWrongGuessMessage('')
    }

    return {
        isTyping,
        inputValue,
        answers,
        guessedCharacters,
        showWinAlert,
        didWin,
        isFirstAnswerSent,
        status,
        availableCharacters,
        wrongGuessMessage,

        setShowWinAlert,

        handleInputChange,
        handleCharacterClick,
        handleGuess,
        handleTryGuessAfterWin,
        handleRefresh
    }
}