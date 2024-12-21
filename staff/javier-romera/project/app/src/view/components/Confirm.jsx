import { Button } from '../library'

export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[yellow]' : 'border-[green]'

    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return <div className="fixed h-full w-full top-0 flex items-center justify-center z-[30]">
        <div className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] bg-white ${borderColor} border-[.5rem] rounded-[.5rem] flex flex-col items-center justify-center px-[1.5rem] gap-2`}>
            <p className="mb-[.75rem] text-[1.25rem]">{message}</p>

            <Button className="px-[0.5rem] bg-[rgba(175,255,255,1)] rounded-[.125rem] py-[0.125rem] text-center border-2 border-black" onClick={handleCancelClick}>Cancel</Button>

            <Button className="px-[0.5rem] rounded-[.125rem] py-[0.125rem] text-center border-2 border-black" onClick={handleAcceptClick}>Accept</Button>
        </div>
    </div>
}