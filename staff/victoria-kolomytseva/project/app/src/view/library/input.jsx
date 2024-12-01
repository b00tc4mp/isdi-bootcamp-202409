export default function Input({ type, id, placeholder }) {
    // console.log('Input -> render')

    return <input type={type} id={id} placeholder={placeholder} className="w-full rounded-xl h-10 text-center py-2" />
}