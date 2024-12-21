import { Button, Form, Input } from '../../library'

import Options from './Options'
import WinScreen from './WinScreen'
import Answers from './Answers'
import AnswersLegend from './AnswersLegend'
import CantPlayAnymoreAlert from './CantPlayAnymoreAlert'

import useController from './useController'
import logic from '../../../logic'

export default function OnePieceDle({ onHomeClick, onLoginClick, onRegisterClick }) {
    const { isTyping,
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
    } = useController()

    return <main className="h-screen w-screen bg-cover bg-center flex justify-center overflow-y-auto" style={{
        backgroundImage: "url('/images/going_merry.png')"
    }}>
        {logic.isUserLoggedIn() && !((logic.isUserRoleAnonymous() && status === 1) || (logic.isUserRoleAnonymous() && status === 3)) && ((guessedCharacters.length > 0 || !didWin) || (guessedCharacters.length > 0 && didWin)) &&
            <section className="mt-[12rem] flex flex-col items-center">
                {wrongGuessMessage && <div className="absolute top-[9.5rem] bg-[rgba(255,255,255,0.6)] py-[.5rem] h-[4rem] w-[21.5rem]">
                    <p className="text-[1.25rem] font-bold text-[red]">{wrongGuessMessage}</p>
                </div>}
                {!didWin &&
                    <Form id="guessForm" onSubmit={handleGuess} className="bg-[rgba(250,249,243,0.9)] z-[10] w-[22rem] min-h-[4rem] flex justify-center items-center rounded-[.5rem] border-[3px] border-[black]">
                        <Input autoFocus id="guess" value={inputValue} onInput={handleInputChange} placeholder="Guess the character name" autoComplete="off" type="text" className="w-[18rem] h-[2.5rem] pl-[.5rem] text-[1.25rem] rounded-[.25rem] border-[4px] border-[#EADEC2] bg-[#FAF9F3] focus:outline-none" />

                        <Button id="guessButton" className="w-[2.5rem] ml-[.25rem] cursor-pointer transition-transform duration-100 ease-in-out hover:scale-110"><img src="/images/arrow_right.png"></img></Button>
                    </Form>}

                {didWin &&
                    <Form id="guessForm" onSubmit={handleTryGuessAfterWin} className="bg-[rgba(250,249,243,0.9)] w-[22rem] min-h-[4rem] flex justify-center items-center rounded-[.5rem] border-[3px] border-[black]">
                        <Input className="w-[18rem] h-[2.5rem] pl-[.5rem] text-[1.25rem] rounded-[.25rem] border-[4px] border-[#EADEC2] bg-[#FAF9F3] focus:outline-none" disabled />
                        <Button className="w-[2.5rem] ml-[.25rem] cursor-pointer"><img src="/images/arrow_right.png"></img></Button>
                    </Form>}
                <div className="relative justify-center items-center w-[22rem]">
                    {isTyping && <Options inputValue={inputValue} availableCharacters={availableCharacters} onCharacterClick={handleCharacterClick} />}
                </div>

                {isFirstAnswerSent &&
                    <div className="flex flex-col w-[fit] px-[1.5rem] pt-[1.5rem] mt-[3rem] bg-[rgba(215,167,104,0.9)] border-[2px] border-[black] rounded-[.75rem]">
                        <AnswersLegend />

                        {<Answers answers={answers.toReversed()} guessedCharacters={guessedCharacters.toReversed()} />}
                    </div>}
            </section>}

        {showWinAlert && <WinScreen onHomeClick={onHomeClick} refresh={handleRefresh} setWinAlert={setShowWinAlert} correctChar={guessedCharacters[guessedCharacters.length - 1].name} tries={guessedCharacters} />}

        {(status === 1 || status === 3) && logic.isUserRoleAnonymous() && !didWin && <CantPlayAnymoreAlert onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} onHomeClick={onHomeClick} />}
    </main>
}