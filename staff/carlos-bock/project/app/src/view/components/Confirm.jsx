export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
    const borderColor = level === 'error' ? 'border-[red]' :
        level === 'warn' ? 'border-[yellow]' :
            'border-[green]'

    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return <div className='confirm-container'>
        <div>
            <p>{message}</p>

            <button onClick={handleCancelClick}>Cancelar</button>
            <button onClick={handleAcceptClick}>Proceder</button>
        </div>
    </div>
}