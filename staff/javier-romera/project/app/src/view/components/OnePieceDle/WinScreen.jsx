import { Button, Anchor } from '../../library'

export default function OnePieceDleWinScreen({ correctChar, setWinAlert, refresh, onHomeClick, tries }) {
    const handleCloseScreen = () => {
        setWinAlert(false)
    }

    const handleHomeClick = event => {
        event.preventDefault()

        onHomeClick()
    }

    return <div className="h-full w-full fixed mt-[10rem] flex justify-center">
        <div className="w-[25rem] h-[30rem] flex flex-col bg-[rgba(234,222,194)] border-[2px] border-[black] rounded-[1rem] mt-[1rem] animate-fadeIn">
            <div className="flex justify-end">
                <Button className="text-[1.5rem] mr-[.5rem] pl-[.5rem]" onClick={handleCloseScreen}>𐢫</Button>
            </div>

            <h1 className="text-[2rem] ">Victory!</h1>
            <p className="mt-[3rem]">You guessed</p>
            <p className="text-[2.5rem]">{correctChar}</p>
            <p className="mt-[1rem]">It took you {tries.length} tries</p>

            <div className="flex flex-col items-center mt-[1rem] gap-[1.5rem]">
                <Button className="bg-[rgba(250,249,243,1)] w-[8rem] text-[1.25rem] mt-[1.5rem] px-[.5rem] rounded-[.25rem] border-[1.5px] border-[black]" onClick={refresh}>Play again</Button>

                <Anchor href="" onClick={handleHomeClick} className="underline text-[1.25rem]">Home</Anchor>
            </div>
        </div>
    </div>
}