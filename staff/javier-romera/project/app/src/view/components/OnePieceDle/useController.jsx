import logic from '../../../logic'
import { errors } from 'com'

import { useState, useEffect } from 'react'
import { capitalizeWords, validateGuess } from '../../../util'

const { SystemError } = errors

export default function useController() {
    const [isFirstAnswerSent, setIsFirstAnswerSent] = useState(false)
    const [didWin, setDidWin] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [randomChar, setRandomChar] = useState()
    const [characters, setCharacters] = useState()
    const [answers, setAnswers] = useState([])
    const [guessedCharacters, setGuessedCharacters] = useState([])
    const [showWinAlert, setShowWinAlert] = useState(false)

    useEffect(() => {
        if (!characters)
            try {
                logic.getAllCharactersNameAndAlias()
                    .then(characters => {
                        setCharacters(characters)
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

        if (!randomChar)
            try {
                logic.getRandomCharacter()
                    .then(char => {
                        console.log(char)
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

        if (didWin) {
            try {
                logic.setNewUserStatus(1)
                    .then(() => {
                        setTimeout(() => {
                            setShowWinAlert(true)
                        }, 1000)
                    })
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

    const handleCharacterClick = (char) => {
        setInputValue(char)

        document.getElementById("guess").focus() // TODO useRef

        setIsTyping(false)
    }

    const handleGuess = (event) => {
        event.preventDefault()

        const { target: { guess: { value: guess } } } = event

        try {
            const parsedGuess = capitalizeWords(guess)

            const found = validateGuess(characters, parsedGuess)

            if (found) {
                logic.getCharacterByName(parsedGuess)
                    .then(char => {
                        const checkedAnswer = logic.checkOnePiecedleAnswer(randomChar, char)

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
                alert('pero q personaje de wanpi es ese muchachooo')
            }
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return {
        isTyping,
        inputValue,
        answers,
        guessedCharacters,
        showWinAlert,
        didWin,
        isFirstAnswerSent,
        characters,

        handleInputChange,
        handleCharacterClick,
        handleGuess,
    }
}