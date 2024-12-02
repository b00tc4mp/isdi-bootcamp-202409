import logic from '../logic'
import { Button, Form, Input } from './library'
import { errors } from 'com'
import { AnswersLegend } from './components'

import { useState, useEffect } from 'react'
import { validateGuess } from '../util'

const { SystemError } = errors

export default function Onepiecedle() {
    const [inputValue, setInputValue] = useState("")
    const [isFirstAnswer, setIsFirstAnswer] = useState(false)
    const [randomChar, setRandomChar] = useState({})
    const [characters, setCharacters] = useState([])

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {
        try {
            logic.getAllCharactersNameAndAlias()
                .then(characters => {
                    console.log(characters) // TODO
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
                    console.log(char) // TODO erase
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

    const handleGuess = event => {
        event.preventDefault()

        const { target: { guess: { value: guess } } } = event

        try {
            const found = validateGuess(characters, guess)

            if (found) {
                logic.getCharacterByName(guess)
                    .then(char => logic.checkOnePiecedleAnswer(randomChar, char))
                    .then(answers => {
                        console.log(answers)

                        setInputValue("")
                        setIsFirstAnswer(true)
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

    return <main className="h-screen w-screen bg-cover bg-center flex justify-center" style={{
        backgroundImage: "url('/images/going_merry.png')",
    }}>
        <section className="mt-[12rem]">
            <Form onSubmit={handleGuess} className="bg-[rgba(250,249,243,0.9)] w-[22rem] h-[4rem] flex justify-center items-center rounded-[.5rem] border-[2px] border-[black]" >
                <Input id="guess" value={inputValue} onChange={handleInputChange} placeholder="Guess the character" autoComplete="off" type="text" className="w-[18rem] h-[2.5rem] pl-[.5rem] text-[1.25rem] rounded-[.25rem] border-[4px] border-[#EADEC2] bg-[#FAF9F3] focus:outline-none" />
                <div className="w-[.8rem] h-[.8rem] bg-[rgba(250,249,243,1)] absolute ml-[13.05rem] mt-[.7rem]"></div>
                <Button className="w-[2.5rem] ml-[.25rem] cursor-pointer transition-transform duration-100 ease-in-out hover:scale-110"><img src="/images/arrow_right.png"></img></Button>
            </Form>
            <div>
                {isFirstAnswer && <AnswersLegend />}
            </div>
        </section>
    </main>
}