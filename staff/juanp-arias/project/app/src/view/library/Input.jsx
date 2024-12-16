export default function Input({ type, id, placeholder, defaultValue, readOnly, disabled }) {
    return <input type={type} id={id} placeholder={placeholder} defaultValue={defaultValue} readOnly={readOnly} disabled={disabled} className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
}