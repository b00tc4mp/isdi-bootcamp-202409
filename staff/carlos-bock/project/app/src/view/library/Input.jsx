export default function Input({ type, id }) {
    console.log('Input -> render')

    return <input type={type} id={id} className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-primary"></input>
}