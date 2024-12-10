import { TopLeftButton, TopMiddleButton, TopRightButton, MiddleLeftButton, MiddleButton, MiddleRightButton, BottomLeftButton, BottomMiddleButton, BottomRightButton } from './library'

import GuessingDiv from './GuessingDiv'
import LoseScreen from './LoseScreen'
import WinScreen from './WinScreen'

import logic from '../../../logic'

import useController from './useController'
import { Button } from '../../library'
import { didFinishBoard } from '../../../util'

export default function OneDoku({ onHomeClick }) {
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
        winAlert,
        loseAlert,

        setWinAlert,
        setLoseAlert,

        handleGridClick,
        handleGridGuessingExit,
        handleSubmit,
        handleInputChange,
        handleCharacterSelected,
        handleRefresh
    } = useController()

    return <main className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center overflow-y-auto" style={{
        backgroundImage: "url('/images/going_merry.png')"
    }}>
        {showBoard && logic.isUserLoggedIn() &&
            < section className="w-full h-full flex flex-col justify-center items-center" onClick={handleGridGuessingExit}>
                <div>
                    <div className="grid grid-cols-5 w-[45rem] h-fit mb-[.5rem]"> {/*Dios y señor de las chapuzas letsgo grid-cols-5*/}
                        <div className="w-0"></div>
                        <div className="flex justify-center items-center"><p className="w-fit bg-[white] border-[2px] border-black rounded-[.5rem] py-[.125rem] px-[.5rem]">{conditions[0].text}</p></div>
                        <div className="flex justify-center items-center"><p className="w-fit bg-[white] border-[2px] border-black rounded-[.5rem] py-[.125rem] px-[.5rem]">{conditions[1].text}</p></div>
                        <div className="flex justify-center items-center"><p className="w-fit bg-[white] border-[2px] border-black rounded-[.5rem] py-[.125rem] px-[.5rem]">{conditions[2].text}</p></div>
                        <div className="w-0"></div>
                    </div>
                    <div className="grid grid-cols-5 w-[45rem] h-[24rem]">
                        <div className="flex self-center place-self-end mr-[.5rem]"><p className="w-fit bg-[white] border-[2px] border-black rounded-[.5rem] py-[.125rem] px-[.5rem]">{conditions[3].text}</p></div>
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
                        <div className="flex self-center place-self-end mr-[.5rem]"><p className="w-fit bg-[white] border-[2px] border-black rounded-[.5rem] py-[.125rem] px-[.5rem]">{conditions[4].text}</p></div>
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
                        <div className="w-[9rem] h-[8rem] flex justify-start items-center pl-[.5rem]"><p className="bg-[white] border-[2px] border-black rounded-[.5rem] px-[.5rem] py-[.125rem]">Health: {hp} / 3</p></div>
                        <div className="flex self-center place-self-end mr-[.5rem]"><p className="w-fit bg-[white] border-[2px] border-black rounded-[.5rem] py-[.125rem] px-[.5rem]">{conditions[5].text}</p></div>
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

                {((hp === 0 && !loseAlert) || (didFinishBoard(userAnswers) && !winAlert)) && <Button onClick={handleRefresh} className="absolute mt-[35rem] text-[1.5rem] bg-[white] px-[.75rem] py-[0.25rem] border-[2px] border-[black] rounded-[.5rem]">Play again</Button>}
            </section>
        }

        {showGuessingDiv && <GuessingDiv currentIndex={index} conditions={conditions} handleSubmit={handleSubmit} inputValue={inputValue} onChange={handleInputChange} isTyping={isTyping} availableCharacters={availableCharacters} handleCharacterSelected={handleCharacterSelected} />}

        {loseAlert && <LoseScreen refresh={handleRefresh} onHomeClick={onHomeClick} setLoseAlert={setLoseAlert} />}

        {winAlert && <WinScreen timeSpent={time} refresh={handleRefresh} onHomeClick={onHomeClick} setWinAlert={setWinAlert} />}
    </main >
}