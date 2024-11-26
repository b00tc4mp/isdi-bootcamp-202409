import { Button } from '../library'

export default function Confirm({ message, level = 'error', onAccepted, onCanceled }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[yellow]' : 'border-[green]'

    const bg = level === 'error' ? 'bg-gradient-to-r from-red-600' : level === 'warn' ? 'bg-gradient-to-r from-yellow-600' : 'bg-gradient-to-r from-green-600'

    const handleCancelClick = () => onCanceled()
    const handleAcceptClick = () => onAccepted()

    return <div className="fixed h-full w-full top-0 flex items-center justify-center bg-black/[0.6]">
        <div className={`bg-white ${borderColor} min-w-[18rem] max-w-[30rem] min-h-[8rem] ${bg} border-[0.1rem] flex flex-col items-center justify-center p-2 gap-2 rounded-xl`}>

            <p>{message}</p>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleAcceptClick}>Accept</Button>

        </div>
    </div>
}