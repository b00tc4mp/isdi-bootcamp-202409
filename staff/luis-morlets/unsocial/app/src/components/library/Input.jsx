export default function Input({ type, id }) {

    console.log('Input -> render')
    return <input type={type} id={id} className="w-full box-border h-7 bg-gray-400 border-2" />
}
