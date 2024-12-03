export default function Input({ type, id, placeholder, value }) {
    // console.log('Input -> render')

    return <input type={type} id={id} placeholder={placeholder} value={value} className="w-full rounded-xl h-10 text-center py-2" />
}