export default function Alert({ message, level = 'error', onAccepted }) {
    const borderColor = level === 'error' ? 'border-[red]' : level === 'warn' ? 'border-[yellow]' : 'border-[green]'

    const handleAcceptClick = () => onAccepted()

    return <div className="alert">
        <div className="alert-box">
            <p>{message}</p>

            <button onClick={handleAcceptClick}>Confirmar</button>
        </div>
    </div>
}