export default function TextareaTask({ id, placeholder, }) {
    return <textarea id={id} placeholder={placeholder} rows='3' className='w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600'></textarea>
}