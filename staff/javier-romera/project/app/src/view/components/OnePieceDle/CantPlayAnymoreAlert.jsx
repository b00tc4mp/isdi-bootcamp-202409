import { Button } from "../../library"

export default function CantPlayAnymoreAlert(props) {
    const handleLoginClick = () => {
        props.onLoginClick()
    }

    const handleRegisterClick = () => {
        props.onRegisterClick()
    }

    const handleHomeClick = () => {
        props.onHomeClick()
    }

    return <div className="h-full w-full fixed mt-[10rem] flex justify-center">
        <div className="w-[25rem] h-[30rem] bg-[rgba(234,222,194)] border-[2px] border-[black] rounded-[1rem] mt-[1rem]">
            <div className="mt-[4rem]">
                <p className="text-[1.75rem]">You are not logged in.</p>
                <p className="mt-[1rem]">You’ve already played this minigame today. To keep playing, please register or log in to continue!</p>
            </div>
            <div className="flex flex-col w-full h-[8rem] mt-[5rem] justify-center items-center gap-[1rem]">
                <Button onClick={handleLoginClick} className="w-[8rem] text-[1.5rem] px-[1rem] rounded-[.25rem] border-[2px] border-[black] bg-[rgba(250,249,243,1)]">Log in</Button>
                <Button onClick={handleRegisterClick} className="w-[8rem] text-[1.5rem] px-[.5rem] rounded-[.25rem] border-[2px] border-[black] bg-[rgba(250,249,243,1)]">Register</Button>
                <Button onClick={handleHomeClick} className="w-[8rem] h-[2rem] mt-[1rem] px-[.5rem] text-[1.25rem] underline">Home</Button>
            </div>
        </div>
    </div>
}