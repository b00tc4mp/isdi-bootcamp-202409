export default function Input({ type, id }) {

    console.log('Input -> render')
    return <input type={type} id={id} className="box-border h-8 bg-gray-400 border-2 text-black" />
}
