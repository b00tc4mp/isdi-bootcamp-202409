import { TopLeftButton, TopMiddleButton, TopRightButton, MiddleLeftButton, MiddleButton, MiddleRightButton, BottomLeftButton, BottomMiddleButton, BottomRightButton } from './library'

import GuessingDiv from './GuessingDiv'
import LoseScreen from './LoseScreen'
import WinScreen from './WinScreen'

import { didFinishBoard } from '../../../util'

import useController from './useController'

export default function OneDoku() {
    const {
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

        handleGridClick,
        handleGridGuessingExit,
        handleSubmit,
        handleInputChange,
        handleCharacterSelected
    } = useController()

    return <main className="h-screen w-screen bg-cover bg-center flex items-center justify-center overflow-y-auto" style={{
        backgroundImage: "url('/images/going_merry.png')"
    }}>
        {showBoard &&
            <section className="w-full h-full flex justify-center items-center" onClick={handleGridGuessingExit}>
                <div>
                    <div className="grid grid-cols-5 w-[45rem] h-fit mb-[.5rem]"> {/*Dios y señor de las chapuzas letsgo grid-cols-5*/}
                        <div className="w-0"></div>
                        <div>{conditions[0].text}</div>
                        <div>{conditions[1].text}</div>
                        <div>{conditions[2].text}</div>
                        <div className="w-0"></div>
                    </div>
                    <div className="grid grid-cols-5 w-[45rem] h-[24rem]">
                        <div className="flex self-center place-self-end mr-[.5rem]">{conditions[3].text}</div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[0] && hp !== 0 ? <TopLeftButton onClick={handleGridClick} /> :
                                <TopLeftButton disabled>{userAnswers[0]}</TopLeftButton>}
                        </div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[1] && hp !== 0 ? <TopMiddleButton onClick={handleGridClick} /> :
                                <TopMiddleButton disabled>{userAnswers[1]}</TopMiddleButton>}
                        </div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[2] && hp !== 0 ? <TopRightButton onClick={handleGridClick}></TopRightButton> :
                                <TopRightButton disabled>{userAnswers[2]}</TopRightButton>}
                        </div>
                        <div className="w-0"></div>
                        <div className="flex self-center place-self-end mr-[.5rem]">{conditions[4].text}</div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[3] && hp !== 0 ? <MiddleLeftButton onClick={handleGridClick}></MiddleLeftButton> :
                                <MiddleLeftButton disabled>{userAnswers[3]}</MiddleLeftButton>}
                        </div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[4] && hp !== 0 ? <MiddleButton onClick={handleGridClick}></MiddleButton> :
                                <MiddleButton disabled>{userAnswers[4]}</MiddleButton>}
                        </div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[5] && hp !== 0 ? <MiddleRightButton onClick={handleGridClick}></MiddleRightButton> :
                                <MiddleRightButton disabled>{userAnswers[5]}</MiddleRightButton>}
                        </div>
                        <div className="w-[9rem] h-[8rem] flex justify-start items-center pl-[.5rem] bg-[red]">HP: {hp}</div>
                        <div className="flex self-center place-self-end mr-[.5rem]">{conditions[5].text}</div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[6] && hp !== 0 ? <BottomLeftButton onClick={handleGridClick}></BottomLeftButton> :
                                <BottomLeftButton disabled>{userAnswers[6]}</BottomLeftButton>}
                        </div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[7] && hp !== 0 ? <BottomMiddleButton onClick={handleGridClick}></BottomMiddleButton> :
                                <BottomMiddleButton disabled>{userAnswers[7]}</BottomMiddleButton>}
                        </div>
                        <div className="w-[9rem] h-[8rem]">
                            {!userAnswers[8] && hp !== 0 ? <BottomRightButton onClick={handleGridClick}></BottomRightButton> :
                                <BottomRightButton disabled>{userAnswers[8]}</BottomRightButton>}
                        </div>
                        <div className="w-0"></div>
                    </div>
                </div>
            </section>}
        {showGuessingDiv && <GuessingDiv currentIndex={index} conditions={conditions} handleSubmit={handleSubmit} inputValue={inputValue} onChange={handleInputChange} isTyping={isTyping} availableCharacters={availableCharacters} handleCharacterSelected={handleCharacterSelected} />}

        {hp === 0 && <LoseScreen />}

        {didFinishBoard(userAnswers) && <WinScreen timeSpent={time} />}
    </main>
}