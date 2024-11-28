import { Button } from './library'

export default function Splash(props) {
    const handleStartClick = event => {
        event.preventDefault()

        props.onStarted()
    }

    return <>
        <div className="flex flex-row items-center justify-center mt-4 fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]">
            <div className="w-60 h-60 bg-[#5988EE] rounded-full"></div>
            <div className="w-60 h-60 bg-[#5988EE] rounded-full"></div>
            <div className="w-60 h-60 bg-[#5988EE] rounded-full"></div>
        </div>

        <div className="flex flex-col items-center justify-center text-center h-screen">
            <h1 className="pb-4">period</h1>
            <p>Understand your cycle<br />Period.</p>
            <Button onClick={handleStartClick}>Click to start</Button>
        </div>
    </>
}