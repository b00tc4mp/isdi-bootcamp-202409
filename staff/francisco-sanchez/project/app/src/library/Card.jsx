export default function Card({ title, value, valueClass }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
            <p className="text-lg font-semibold text-gray-700">{title}</p>
            <span className={`text-xl font-bold ${valueClass}`}>{value}</span>
        </div>
    );
}