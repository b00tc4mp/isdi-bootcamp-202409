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
            <div className="bg-[red] w-[18rem] h-[18rem] flex flex-col justify-evenly items-center">
                <div className="w-[17rem] bg-[green] flex items-center">
                    <Button className="bg-[white] text-[1.25rem] w-full px-[.5rem] h-[3rem] flex items-center transition-transform duration-150 ease-in-out hover:scale-110"><img className="mr-2 ml-2 w-[40px]" src="/images/merry_icon.png"></img>Explore the sea!</Button>
                </div>
                <div className="w-[17rem] bg-[green] flex items-center">
                    <Button onClick={handleGuessCharacterGameMode} className="bg-[white] text-[1.25rem] w-full px-[.5rem] h-[3rem] flex items-center transition-transform duration-150 ease-in-out hover:scale-110"><img className="mr-2 w-[50px]" src="/images/luffy_icon.png"></img>Guess the character</Button>
                </div>
                <div className="w-[17rem] bg-[green] flex items-center">
                    <Button className="bg-[white] text-[1.25rem] w-full px-[.5rem] h-[3rem] flex items-center transition-transform duration-150 ease-in-out hover:scale-110"><img className="mr-2 ml-2 w-[40px]" src="/images/zoro_icon.png"></img>OneDoku puzzle</Button>
                </div>
            </div>}
    </main>
}