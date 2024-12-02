export default function Button({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className="flex place-self-center uppercase w-auto border text-[var(--text-color-light)] bg-[var(--Button-color)] rounded-full mt-5 mb-3 py-1 px-8" >{children}</button>
}