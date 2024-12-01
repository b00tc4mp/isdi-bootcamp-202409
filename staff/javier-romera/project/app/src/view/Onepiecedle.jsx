import logic from '../logic'
import { Button, Form, Input } from './library'

export default function Onepiecedle() {
    let randomChar

    try {
        logic.getRandomCharacter()
            .then(char => {
                randomChar = char
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

    const handleGuess = event => {
        event.preventDefault()

        const { target: { guess: { value: guess } } } = event

        try {
            logic.getCharacterByName(guess)
                .then(console.log)

            event.target.guess.value = ""
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <main className="h-screen w-screen bg-cover bg-center flex justify-center" style={{
        backgroundImage: "url('/images/going_merry.png')",
    }}>
        <Form onSubmit={handleGuess} className="bg-[rgba(250,249,243,0.9)] mt-[12rem] w-[22rem] h-[4rem] flex justify-center items-center rounded-[.5rem] border-[2px] border-[black]" >
            <Input id="guess" placeholder="Guess the character" autoComplete="off" className="w-[18rem] h-[2.5rem] pl-[.5rem] text-[1.25rem] rounded-[.25rem] border-[4px] border-[#EADEC2] bg-[#FAF9F3] focus:outline-none" />
            <Button className="w-[2.5rem] ml-[.25rem] cursor-pointer transition-transform duration-100 ease-in-out hover:scale-110"><img src="/images/arrow_right.png"></img></Button>
        </Form>
    </main>
}