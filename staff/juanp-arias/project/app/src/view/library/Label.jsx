export default function Label({ htmlFor, children }) {
    return <label htmlFor={htmlFor} className='block text-sm font-medium text-gray-700 dark:text-gray-200'>{children}</label>
}