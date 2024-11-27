import './Input.css'

export default ({ type, id }) => {
    console.log('Input -> render')

    return <input type={type} id={id} className="Input" />
}