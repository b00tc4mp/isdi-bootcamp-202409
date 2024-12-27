export default function Input({ type, id, autoComplete, placeholder, value, onInput, ref, className, autoFocus, disabled }) {
    return <input className={className} ref={ref} placeholder={placeholder} id={id} type={type} value={value} onInput={onInput} autoComplete={autoComplete} autoFocus={autoFocus} disabled={disabled} />
}