import { Button } from "../library"

export default function Alert({ message, level = 'error', onAccepted }) {
    const borderColor = level === 'error' ? 'border-[#f5795a]' : level === 'warn' ? 'border-[#f5e75a]' : 'border-[#75fa66]'

    const handleAcceptClick = () => onAccepted()

    return <div className="fixed h-full w-full left-0 top-0 flex items-center justify-center">
        <div className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] bg-[var(--back-color-light)] ${borderColor} border-2 flex flex-col items-center justify-center p-2 gap-2 rounded-lg`}>
            <p>{message}</p>

            <Button onClick={handleAcceptClick}>Accept</Button>
        </div>
    </div>
}