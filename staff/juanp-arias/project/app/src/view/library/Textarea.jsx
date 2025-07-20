export default function Textarea({ id, placeholder, }) {
    return <textarea id={id} placeholder={placeholder} className='w-full h-60 p-4 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none resize-none text-gray-800 dark:text-gray-200'></textarea>
}