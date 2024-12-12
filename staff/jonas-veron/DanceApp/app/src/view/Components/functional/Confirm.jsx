export default function Confirm({
  message,
  level = "error",
  onAccepted,
  onCancelled,
}) {
  const borderColor =
    level === "error"
      ? "border-[#eb4747]"
      : level === "warn"
      ? "border-[yellow]"
      : "border-[green]"

  const handleCancelClick = () => onCancelled()

  const handleAcceptClick = () => onAccepted()

  return (
    <div className="fixed h-full w-full bg-black bg-opacity-50 top-0 flex items-center justify-center mb-12">
      <div
        className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] bg-white ${borderColor} border-[1rem] flex flex-col items-center justify-center p-2 gap-2`}
      >
        <p>{message}</p>

        <button
          className="border-2 border-black pt-1"
          onClick={handleCancelClick}
        >
          Cancelar
        </button>
        <button
          className="border-2 border-black pt-1"
          onClick={handleAcceptClick}
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
