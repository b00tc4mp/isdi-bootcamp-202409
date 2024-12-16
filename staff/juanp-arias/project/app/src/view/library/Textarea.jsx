export default function Textarea({ id, placeholder, }) {
    return <textarea id={id} placeholder={placeholder} className='w-full h-60 p-4  border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none'></textarea>
}