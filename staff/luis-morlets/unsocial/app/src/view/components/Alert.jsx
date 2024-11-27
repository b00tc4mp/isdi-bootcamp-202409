export default function Alert({ message, level = 'error', onAccepted }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[gold]' : 'border-[forestgreen]'

    const handleAcceptClick = () => onAccepted()

    return <div className="fixed h-full w-full top-0 flex items-center justify-center">
        <div className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] bg-white ${borderColor} border-[.5rem] flex flex-col items-center justify-center p-2 gap-2`}>
            <p>{message}</p>

            <button className="border-2 border-black p-1" onClick={handleAcceptClick}>Accept</button>
        </div>
    </div>
}