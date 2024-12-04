export default function Button({ type, children, onClick }) {

    return <button
        type={type}
        onClick={onClick}
        className={`flex place-self-center`}
    >{children}</button>
}