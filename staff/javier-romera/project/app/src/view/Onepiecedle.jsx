import logic from '../logic'
import { Button, Form, Input } from './library'
import { errors } from 'com'
import { Options, AnswersLegend, Answers } from './components'

import { useState, useEffect } from 'react'
import { capitalizeWords, validateGuess } from '../util'

const { SystemError } = errors

export default function Onepiecedle() {
    const [isFirstAnswerSent, setIsFirstAnswerSent] = useState(false)
    const [didWin, setDidWin] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [randomChar, setRandomChar] = useState()
    const [characters, setCharacters] = useState()
    const [answers, setAnswers] = useState([])
    const [guessedCharacters, setGuessedCharacters] = useState([])

    useEffect(() => {
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
    }, [])

    const handleInputChange = event => {
        setInputValue(event.target.value)
        event.target.value ? setIsTyping(true) : setIsTyping(false)
    }

    const handleCharacterClick = (char) => {
        setInputValue(char)

        document.getElementById("guess").focus()

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

    return <main className="h-screen w-screen bg-cover bg-center flex justify-center overflow-y-auto" style={{
        backgroundImage: "url('/images/going_merry.png')",
    }}>
        <section className="mt-[12rem] flex flex-col items-center">
            <Form id="guessForm" onSubmit={handleGuess} className="bg-[rgba(250,249,243,0.9)] w-[22rem] min-h-[4rem] flex justify-center items-center rounded-[.5rem] border-[2px] border-[black]">
                <Input id="guess" value={inputValue} onInput={handleInputChange} placeholder="Guess the character" autoComplete="off" type="text" className="w-[18rem] h-[2.5rem] pl-[.5rem] text-[1.25rem] rounded-[.25rem] border-[4px] border-[#EADEC2] bg-[#FAF9F3] focus:outline-none" />
                <Button id="guessButton" className="w-[2.5rem] ml-[.25rem] cursor-pointer transition-transform duration-100 ease-in-out hover:scale-110"><img src="/images/arrow_right.png"></img></Button>
            </Form>

            {isTyping && <Options inputValue={inputValue} characters={characters} onCharacterClick={handleCharacterClick} />}

            {isFirstAnswerSent && <div className="flex flex-col w-[fit] px-[1.5rem] pt-[1.5rem] mt-[1rem] bg-[rgba(215,167,104,0.9)] border-[2px] border-[black] rounded-[.75rem]">
                <AnswersLegend />
                {<Answers answers={answers.toReversed()} guessedCharacters={guessedCharacters.toReversed()} />}
            </div>}
        </section>
    </main>
}