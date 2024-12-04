import { Button, Form, Input } from '../../library'

import { Options, AnswersLegend, Answers, OnePieceDleWinScreen } from '../'

import useController from './useController'

export default function OnePieceDle() {
    const { isTyping,
        inputValue,
        answers,
        guessedCharacters,
        showWinAlert,
        didWin,
        isFirstAnswerSent,
        characters,

        handleInputChange,
        handleCharacterClick,
        handleGuess
    } = useController()

    return <main className="h-screen w-screen bg-cover bg-center flex justify-center overflow-y-auto" style={{
        backgroundImage: "url('/images/going_merry.png')",
    }}>
        <section className="mt-[12rem] flex flex-col items-center">
            <Form id="guessForm" onSubmit={handleGuess} className="bg-[rgba(250,249,243,0.9)] w-[22rem] min-h-[4rem] flex justify-center items-center rounded-[.5rem] border-[2px] border-[black]">
                {!didWin ?
                    <Input id="guess" value={inputValue} onInput={handleInputChange} placeholder="Guess the character" autoComplete="off" type="text" className="w-[18rem] h-[2.5rem] pl-[.5rem] text-[1.25rem] rounded-[.25rem] border-[4px] border-[#EADEC2] bg-[#FAF9F3] focus:outline-none" /> :
                    <Input value={inputValue} className="w-[18rem] h-[2.5rem] pl-[.5rem] text-[1.25rem] rounded-[.25rem] border-[4px] border-[#EADEC2] bg-[#FAF9F3] focus:outline-none" disabled />}
                {!didWin ? <Button id="guessButton" className="w-[2.5rem] ml-[.25rem] cursor-pointer transition-transform duration-100 ease-in-out hover:scale-110"><img src="/images/arrow_right.png"></img></Button> :
                    <Button className="w-[2.5rem] ml-[.25rem] cursor-pointer" disabled><img src="/images/arrow_right.png"></img></Button>}
            </Form>
            {isTyping && <Options inputValue={inputValue} characters={characters} onCharacterClick={handleCharacterClick} />}

            {isFirstAnswerSent && <div className="flex flex-col w-[fit] px-[1.5rem] pt-[1.5rem] mt-[1rem] bg-[rgba(215,167,104,0.9)] border-[2px] border-[black] rounded-[.75rem]">
                <AnswersLegend />
                {<Answers answers={answers.toReversed()} guessedCharacters={guessedCharacters.toReversed()} />}
            </div>}
        </section>

        {showWinAlert && <OnePieceDleWinScreen />}
    </main>
}