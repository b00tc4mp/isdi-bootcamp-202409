import './Input.css'

export default ({ type, id, autoComplete }) => {
    return <input className="Input" id={id} type={type} autoComplete={autoComplete}></input>
}