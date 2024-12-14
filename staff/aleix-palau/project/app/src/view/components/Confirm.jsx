export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[yellow]' : 'border-[green]'

    const handleCancelClick = () => onCancelled()
    const handleAcceptClick = () => onAccepted()

    return <div className="fixed h-full w-full top-0 flex items-center justify-center">
        <div className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] bg-white ${borderColor} border-[1rem] flex flex-col items-center justify-center p-2 gap-2`}>
            {/* condition not to break HTML nesting rules in NameDOBStage alert */}
            {typeof message === 'string' ? (<p>{message}</p>) : (<div>{message}</div>)}

            <button className="border-2 border-black pt-1 bg-gray-400" onClick={handleCancelClick}>Cancel</button>
            <button className="border-2 border-black pt-1" onClick={handleAcceptClick}>Confirm</button>
        </div>
    </div >
}