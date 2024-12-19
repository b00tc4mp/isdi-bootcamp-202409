export default function ButtonSmall({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className="flex place-self-center uppercase w-auto border-2 border-[var(--back-color-dark)] bg-[var(--back-color-light)] rounded-full mt-5 mb-5 py-1 px-6 text-sm" >{children}</button>
}