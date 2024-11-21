import './Button.css'

export default function Button({ type, children, onClick }) {
    return <button
        type={type}
        className="Button text-black text-sm w-14"
        onClick={onClick}>{children}</button>
}
