export default function Input({ type, id, autoComplete, placeholder, value, onChange, className }) {
    return <input className={className} placeholder={placeholder} id={id} type={type} value={value} onInput={onChange} autoComplete={autoComplete} />
}