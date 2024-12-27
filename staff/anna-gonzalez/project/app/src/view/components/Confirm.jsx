import { Button, ButtonSmall } from "../library"

export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
    const handleCancelClick = () => onCancelled()

    const handleAcceptClick = () => onAccepted()

    return <div className="fixed h-full w-full left-0 top-0 flex items-center justify-center">
        <div className={`min-w-[18rem] max-w-[18rem] min-h-[8rem] bg-[var(--grey-color)] border-2 border-black flex flex-col items-center justify-center p-4 rounded-lg`}>
            <p className="text-center">{message}</p>

            <Button onClick={handleCancelClick}>Cancel</Button>

            <ButtonSmall onClick={handleAcceptClick}>Accept</ButtonSmall>
        </div>
    </div>
}