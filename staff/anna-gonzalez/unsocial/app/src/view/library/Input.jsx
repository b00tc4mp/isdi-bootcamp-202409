export default function Input({ type, id }) {
    //console.log('Input -> render')

    const className = type === 'password' ? 'Input password-input' : 'Input'
    return <input type={type} id={id} className="w-56 h-8 px-3 box-border bg-[var(--color)] border-2 border-gray-950 rounded-2xl" />
}