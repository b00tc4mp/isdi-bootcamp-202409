import { TopLeftButton, TopMiddleButton, TopRightButton, MiddleLeftButton, MiddleButton, MiddleRightButton, BottomLeftButton, BottomMiddleButton, BottomRightButton } from './library'

import GuessingDiv from './GuessingDiv'

import useController from './useController'

export default function OneDoku() {
    const {
        showBoard,
        showGuessingDiv,

        handleGridClick,
        handleGridGuessingExit
    } = useController()

    return <main className="h-screen w-screen bg-cover bg-center flex justify-center items-center overflow-y-auto" style={{
        backgroundImage: "url('/images/going_merry.png')"
    }}>
        {!showBoard &&
            <section className="w-full h-full flex justify-center items-center" onClick={handleGridGuessingExit}>
                <div>
                    <div className="grid grid-cols-5 w-[45rem] h-fit mb-[.5rem]"> {/*Dios y señor de las chapuzas letsgo grid-cols-5*/}
                        <div></div>
                        <div>CC1</div>
                        <div>CC2</div>
                        <div>CC3</div>
                        <div></div>
                    </div>
                    <div className="grid grid-cols-5 w-[45rem] h-[25rem]">
                        <div className="flex self-center place-self-end mr-[.5rem]">CR1</div>
                        <div className="w-full h-full"><TopLeftButton onClick={handleGridClick}></TopLeftButton></div>
                        <div className="w-full h-full"><TopMiddleButton></TopMiddleButton></div>
                        <div className="w-full h-full"><TopRightButton></TopRightButton></div>
                        <div></div>
                        <div className="flex self-center place-self-end mr-[.5rem]">CR2</div>
                        <div className="w-full h-full"><MiddleLeftButton></MiddleLeftButton></div>
                        <div className="w-full h-full"><MiddleButton></MiddleButton></div>
                        <div className="w-full h-full"><MiddleRightButton></MiddleRightButton></div>
                        <div></div>
                        <div className="flex self-center place-self-end mr-[.5rem]">CR3</div>
                        <div className="w-full h-full"><BottomLeftButton></BottomLeftButton></div>
                        <div className="w-full h-full"><BottomMiddleButton></BottomMiddleButton></div>
                        <div className="w-full h-full"><BottomRightButton></BottomRightButton></div>
                        <div></div>
                    </div>
                </div>
            </section>}

        {showGuessingDiv && <GuessingDiv />}
    </main>
}