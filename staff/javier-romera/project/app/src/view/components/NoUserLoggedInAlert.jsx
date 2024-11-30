import { Button } from '../library'

export default function NoUserLoggedInAlert(props) {
    const handleLoginClick = () => {
        props.onLoginClick()
    }

    const handleRegisterClick = () => {
        props.onRegisterClick()
    }

    const handlePlayAsGuest = () => {
        props.handlePlayAsGuestClick()
    }

    return <div className="w-screen h-screen fixed top-0 flex justify-center items-center">
        <div className="w-[22rem] h-[28rem] bg-[red]">
            <p className="text-[1.25rem]">Hey! You’re not logged in. You can either log in to access your account, register to have one or continue playing as a guest. Your choice!</p>
            <p>If you choose to play as a guest, some features of the site won’t be available. Log in to enjoy the full experience!</p>

            <div className="flex flex-col w-full h-[8rem] mt-[4rem] justify-center items-center">
                <div className="bg-[green] w-full h-1/2 flex justify-center items-center">
                    <Button onClick={handleLoginClick} className="bg-[white] text-[1.25rem] h-[2rem] px-[.5rem]">Login</Button>
                </div>
                <div className="bg-[orange] w-[14rem] h-1/2 grid grid-cols-2 justify-center items-center">
                    <div>
                        <Button onClick={handleRegisterClick} className="bg-white w-[5rem] h-[2rem] px-[.25rem]">Register</Button>
                    </div>
                    <div>
                        <Button onClick={handlePlayAsGuest} className="bg-[lightgreen] h-[2rem] px-[.25rem]">Play as guest</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}