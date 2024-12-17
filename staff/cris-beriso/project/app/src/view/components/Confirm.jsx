import { Button } from '../library'
export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {

  const handleCancelClick = () => onCancelled()

  const handleAcceptClick = () => onAccepted()

  return <div className="fixed h-full w-full top-0 flex items-center justify-center">
    <div className="min-w-[20rem] max-w-[30rem] min-h-[10rem] bg-[#DAF3EA] flex flex-col items-center justify-center p-2 gap-2 rounded-lg shadow-lg">
      <p>{message}</p>

      <Button className="border-2 border-black pt-1 bg-gray-400" onClick={handleCancelClick}>Cancel</Button>
      <Button className="border-2 border-black pt-1" onClick={handleAcceptClick}>Accept</Button>
    </div>
  </div>
}