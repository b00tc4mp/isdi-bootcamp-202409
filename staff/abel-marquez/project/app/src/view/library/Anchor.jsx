export default function Anchor({ type, children, onClick }) {
    return <a type={type} onClick={onClick} className="flex flex-col place-self-center mb-px">{children}</a>
}