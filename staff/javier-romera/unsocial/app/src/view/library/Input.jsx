export default function Input({ type, id, autoComplete, classname }) {
    return <input className={classname} id={id} type={type} autoComplete={autoComplete}></input>
}