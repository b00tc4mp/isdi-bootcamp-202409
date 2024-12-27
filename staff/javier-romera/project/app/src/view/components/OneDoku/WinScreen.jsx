import { Button, Anchor } from '../../library'

export default function WinScreen({ timeSpent, refresh, onHomeClick, setWinAlert }) {
    const handleCloseScreen = () => {
        setWinAlert(false)
    }

    const handleHomeClick = event => {
        event.preventDefault()

        onHomeClick()
    }

    return <div className="fixed bg-[rgba(215,167,104,1)] w-[20rem] h-[30rem] rounded-[1rem] border-[2px] border-[black]">
        <div className="flex justify-end">
            <Button className="text-[1.5rem] mr-[.5rem] pl-[.5rem]" onClick={handleCloseScreen}>𐢫</Button>
        </div>

        <h1 className="text-[1.5rem] mt-[2.5rem] font-bold">You won!</h1>

        <p className="mt-[1rem] mb-[1rem] px-[1rem] ">Congratulations, you completed the puzzle!</p>
        <p>It took you:</p>
        <p className="mt-[.5rem] text-[2rem]">{timeSpent}</p>

        <div className="flex flex-col items-center mt-[1rem] gap-[1.5rem]">
            <Button className="bg-[rgba(250,249,243,1)] w-[8rem] text-[1.25rem] mt-[1.5rem] px-[.5rem] rounded-[.25rem] border-[1.5px] border-[black]" onClick={refresh}>Play again</Button>

            <Anchor href="" onClick={handleHomeClick} className="underline text-[1.25rem]">Home</Anchor>
        </div>
    </div>
}