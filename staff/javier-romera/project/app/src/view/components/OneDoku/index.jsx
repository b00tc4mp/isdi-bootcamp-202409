import { TopLeftButton, TopMiddleButton, TopRightButton, MiddleLeftButton, MiddleButton, MiddleRightButton, BottomLeftButton, BottomMiddleButton, BottomRightButton } from './library'

import GuessingDiv from './GuessingDiv'

import useController from './useController'

export default function OneDoku() {
    const {
        showBoard,
        showGuessingDiv,
        conditions,
        index,
        inputValue,
        isTyping,

        handleGridClick,
        handleGridGuessingExit,
        handleSubmit,
        handleInputChange
    } = useController()

    return <main className="h-screen w-screen bg-cover bg-center flex justify-center items-center overflow-y-auto" style={{
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
                        <div className="w-[9rem] h-[8rem]"><TopLeftButton onClick={handleGridClick}></TopLeftButton></div>
                        <div className="w-[9rem] h-[8rem]"><TopMiddleButton onClick={handleGridClick}></TopMiddleButton></div>
                        <div className="w-[9rem] h-[8rem]"><TopRightButton onClick={handleGridClick}></TopRightButton></div>
                        <div className="w-0"></div>
                        <div className="flex self-center place-self-end mr-[.5rem]">{conditions[4].text}</div>
                        <div className="w-[9rem] h-[8rem]"><MiddleLeftButton onClick={handleGridClick}></MiddleLeftButton></div>
                        <div className="w-[9rem] h-[8rem]"><MiddleButton onClick={handleGridClick}></MiddleButton></div>
                        <div className="w-[9rem] h-[8rem]"><MiddleRightButton onClick={handleGridClick}></MiddleRightButton></div>
                        <div className="w-0"></div>
                        <div className="flex self-center place-self-end mr-[.5rem]">{conditions[5].text}</div>
                        <div className="w-[9rem] h-[8rem]"><BottomLeftButton onClick={handleGridClick}></BottomLeftButton></div>
                        <div className="w-[9rem] h-[8rem]"><BottomMiddleButton onClick={handleGridClick}></BottomMiddleButton></div>
                        <div className="w-[9rem] h-[8rem]"><BottomRightButton onClick={handleGridClick}></BottomRightButton></div>
                        <div className="w-0"></div>
                    </div>
                </div>
            </section>}
        {showGuessingDiv && <GuessingDiv currentIndex={index} conditions={conditions} handleSubmit={handleSubmit} inputValue={inputValue} onChange={handleInputChange} isTyping={isTyping} />}
    </main>
}