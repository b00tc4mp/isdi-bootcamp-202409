export default function Input({ type, id, autoComplete, placeholder, className }) {
    return <input className={className} placeholder={placeholder} id={id} type={type} autoComplete={autoComplete} />
}