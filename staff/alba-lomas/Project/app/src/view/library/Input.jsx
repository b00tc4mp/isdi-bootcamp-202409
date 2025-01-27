


export default function Input({ type, id, onChange, defaultValue = "" }) {

    return <input type={type} id={id} onChange={onChange} placeholder={defaultValue} className="w-full box-border border-[var(--color)] border-2 rounded-lg" />
}