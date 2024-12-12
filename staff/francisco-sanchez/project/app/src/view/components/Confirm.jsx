export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[yellow]' : 'border-[green]'

    const handleAcceptClick = () => onAccepted()
    const handleCancelClick = () => onCancelled()

    return <div className="fixed h-full w-full top-0 flex items-center justify-center  text-blue-950 bg-black/[0.6]">
        <div className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] bg-white  text-blue-950 ${borderColor} border-[1rem] flex flex-col items-center justify-center p-2 gap-2 rounded-md shadow-xl`}>
            <p className=" text-blue-950">{message}</p>
            <div className="flex flex-row p-2">
                <button className="border-2 border-black pt-1 bg-gray-400 rounded-md p-2 hover:bg-blue-200 mx-2" onClick={handleCancelClick}>Cancel</button>
                <button className="border-2 border-black pt-1 rounded-md p-2 hover:bg-blue-200 mx-2" onClick={handleAcceptClick}>Accept</button>
            </div>
        </div>
    </div>
}