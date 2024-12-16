export default function Span({ level = 'gray', type, children }) {
    const textColor = level === 'blue' ? 'text-blue-500' : level === 'red' ? 'text-red-500' : 'text-gray-500' 
    return <span type={type} className={`font-semibold ${textColor}`}>{children}</span>
}