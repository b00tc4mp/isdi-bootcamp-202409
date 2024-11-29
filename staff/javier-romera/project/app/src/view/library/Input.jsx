export default function Input({ type, id, autoComplete, className }) {
    return <input className={className} id={id} type={type} autoComplete={autoComplete} />
}