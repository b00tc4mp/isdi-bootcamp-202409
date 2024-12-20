export default function Alert({ message, level = 'error', onAccepted }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[yellow]' : 'border-[green]'

    const handleAcceptClick = () => onAccepted()

    return <div className="fixed h-full w-full top-0 text-blue-950 flex items-center justify-center bg-black/[0.6]">
        <div className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] bg-white text-blue-950 ${borderColor} border-[1rem] flex flex-col items-center justify-center p-6 gap-2 rounded-md shadow-xl `}>
            <p className="text-blue-950 ">{message}</p>

            <button className="border-2 border-black pt-1 rounded-md p-2 hover:bg-blue-200" onClick={handleAcceptClick}>Accept</button>
        </div>
    </div>
}