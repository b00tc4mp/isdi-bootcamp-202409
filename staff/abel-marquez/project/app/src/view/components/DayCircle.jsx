export default function DayCircle({ dayNumber, dayName, isActive }) {

    return (
        <div className="flex flex-col items-center">

            <span className="text-sm text-gray-500">{dayName}</span>

            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${isActive ? "bg-blue-500 text-white border-blue-500" : "bg-white text-black border-gray-300"}`}>{dayNumber}
                
            </div>

        </div>
    )
}