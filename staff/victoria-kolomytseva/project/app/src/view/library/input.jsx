export default function Input({ type, id, placeholder, defaultValue, className }) {

    return <input type={type} id={id} placeholder={placeholder} defaultValue={defaultValue} className="w-full rounded-xl h-10 text-center py-2" />
}