import { TopLeftButton, TopMiddleButton, TopRightButton, MiddleLeftButton, MiddleButton, MiddleRightButton, BottomLeftButton, BottomMiddleButton, BottomRightButton } from './library'

import GuessingDiv from './GuessingDiv'

import useController from './useController'

export default function OneDoku() {
    const {
        showBoard,
        showGuessingDiv,
        conditions,

        handleGridClick,
        handleGridGuessingExit
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
                        <div className="w-[9rem] h-[8rem]"><TopMiddleButton></TopMiddleButton></div>
                        <div className="w-[9rem] h-[8rem]"><TopRightButton></TopRightButton></div>
                        <div className="w-0"></div>
                        <div className="flex self-center place-self-end mr-[.5rem]">{conditions[4].text}</div>
                        <div className="w-[9rem] h-[8rem]"><MiddleLeftButton></MiddleLeftButton></div>
                        <div className="w-[9rem] h-[8rem]"><MiddleButton></MiddleButton></div>
                        <div className="w-[9rem] h-[8rem]"><MiddleRightButton></MiddleRightButton></div>
                        <div className="w-0"></div>
                        <div className="flex self-center place-self-end mr-[.5rem]">{conditions[5].text}</div>
                        <div className="w-[9rem] h-[8rem]"><BottomLeftButton></BottomLeftButton></div>
                        <div className="w-[9rem] h-[8rem]"><BottomMiddleButton></BottomMiddleButton></div>
                        <div className="w-[9rem] h-[8rem]"><BottomRightButton></BottomRightButton></div>
                        <div className="w-0"></div>
                    </div>
                </div>
            </section>}

        {showGuessingDiv && <GuessingDiv />}
    </main>
}