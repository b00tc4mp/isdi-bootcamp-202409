import './Input.css'

function Input({ type, id }) {
    return <input className="Input" id={id} type={type}></input>
}

export default Input