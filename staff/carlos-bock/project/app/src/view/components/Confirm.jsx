export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
    const borderColor = level === 'error' ? 'border-[red]' :
        level === 'warn' ? 'border-[yellow]' :
            'border-[green]'

    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return <div className='z-50 absolute h-screen w-full top-0 flex items-center justify-center backdrop-blur-md '>
        <div>
            <p className="font-black text-2xl">{message}</p>

            <button className='m-2.5 p-2 border-solid bg-slate-600 rounded-md text-white' onClick={handleCancelClick}>Cancelar</button>
            <button className='m-2.5 p-2 border-solid bg-slate-600 rounded-md text-white' onClick={handleAcceptClick}>Proceder</button>
        </div>
    </div>
}