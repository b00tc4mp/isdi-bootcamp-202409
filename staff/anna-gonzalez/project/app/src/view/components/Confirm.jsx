import { Button } from "../library"

export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[yellow]' : 'border-[green]'

    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return <div className="fixed h-full w-full left-0 top-0 flex items-center justify-center">
        <div className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] bg-[var(--back-color-light)] ${borderColor} border-2 flex flex-col items-center justify-center p-2 gap-2 rounded-lg`}>
            <p>{message}</p>

            <Button className="border-2 border-black pt-1 bg-gray-400" onClick={handleCancelClick}>Cancel</Button>

            <Button className="border-2 border-black pt-1" onClick={handleAcceptClick}>Accept</Button>
        </div>
    </div>
}