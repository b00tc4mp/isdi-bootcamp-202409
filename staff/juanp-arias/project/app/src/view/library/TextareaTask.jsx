export default function TextareaTask({ id, placeholder, }) {
    return <textarea id={id} placeholder={placeholder} rows='3'
        className='w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'></textarea>
}