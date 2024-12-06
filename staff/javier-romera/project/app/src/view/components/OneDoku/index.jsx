import { Button } from '../../library'

import { TopLeftButton, TopMiddleButton, TopRightButton, MiddleLeftButton, MiddleButton, MiddleRightButton, BottomLeftButton, BottomMiddleButton, BottomRightButton } from './library'

export default function OneDoku() {
    return <main className="h-screen w-screen bg-cover bg-center flex justify-center items-center overflow-y-auto" style={{
        backgroundImage: "url('/images/going_merry.png')"
    }}>
        <section>
            <div>
                <div className="grid grid-cols-5 w-[45rem] h-fit mb-[.5rem]"> {/*Dios y señor de las chapuzas letsgo grid-cols-5*/}
                    <div></div>
                    <div><p>CC1</p></div>
                    <div><p>CC2</p></div>
                    <div><p>CC3</p></div>
                    <div></div>
                </div>
                <div className="grid grid-cols-5 w-[45rem] h-[25rem]">
                    <div className="flex self-center place-self-end mr-[.5rem]">CR1</div>
                    <div className="w-full h-full"><TopLeftButton></TopLeftButton></div>
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
        </section>
    </main>
}