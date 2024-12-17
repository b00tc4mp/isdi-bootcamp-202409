export default function Span({ level = 'gray', type, children }) {
    const textColor = level === 'blue' ? 'text-blue-500 dark:text-blue-400' : level === 'red' ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
    return <span type={type} className={`font-semibold ${textColor}`}>{children}</span>
}