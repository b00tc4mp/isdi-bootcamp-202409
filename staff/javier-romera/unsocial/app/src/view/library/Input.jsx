export default function Input({ type, id, autoComplete, classname }) {
    return <input className="bg-[black] border-solid border px-1.5 py-0.5 border-[var(--color)] w-5/6 h-6 rounded" id={id} type={type} autoComplete={autoComplete} />
}