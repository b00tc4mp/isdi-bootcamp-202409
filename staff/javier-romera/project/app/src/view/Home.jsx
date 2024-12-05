import logic from '../logic'
import { Button } from './library'

export default function Home(props) {
    const handleGuessCharacterGameMode = () => {
        props.onGuessCharacter()
    }

    return <main className="h-screen w-screen bg-cover bg-center flex justify-center items-center" style={{
        backgroundImage: "url('/images/going_merry.png')",
    }}>
        {logic.isUserLoggedIn() &&
            <div className="bg-[rgba(215,167,104,0.8)] w-[22rem] h-[22rem] flex flex-col justify-evenly items-center rounded-[1rem] border-[2px] border-[black]">
                <div className="w-[17rem] flex items-center">
                    <Button className="bg-[rgba(175,255,255,0.8)] text-[1.25rem] w-full px-[.5rem] h-[3rem] flex items-center transition-transform duration-150 ease-in-out hover:scale-110 rounded-[.5rem] border-[2px] border-[black]"><img className="mr-2 ml-2 w-[40px]" src="/images/merry_icon.png"></img>Explore the sea!</Button>
                </div>
                <div className="w-[17rem] flex items-center">
                    <Button onClick={handleGuessCharacterGameMode} className="bg-[rgba(175,255,255,0.8)] text-[1.25rem] w-full px-[.5rem] h-[3rem] flex items-center transition-transform duration-150 ease-in-out hover:scale-110 rounded-[.5rem] border-[2px] border-[black]"><img className="mr-2 w-[50px]" src="/images/luffy_icon.png"></img>OnePieceDle</Button>
                </div>
                <div className="w-[17rem] flex items-center">
                    <Button className="bg-[rgba(175,255,255,0.8)] text-[1.25rem] w-full px-[.5rem] h-[3rem] flex items-center transition-transform duration-150 ease-in-out hover:scale-110 rounded-[.5rem] border-[2px] border-[black]"><img className="mr-2 ml-2 w-[40px]" src="/images/zoro_icon.png"></img>OneDoku</Button>
                </div>
            </div>}
    </main>
}