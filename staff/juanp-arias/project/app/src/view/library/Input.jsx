export default function Input({ type, id, placeholder, defaultValue }) {
    return <input type={type} id={id} placeholder={placeholder} defaultValue={defaultValue} className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
}