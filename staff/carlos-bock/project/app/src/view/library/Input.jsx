export default function Input({ type, id }) {
    console.log('Input -> render')

    return <input type={type} id={id} className="w-full box-border border-black"></input>
}