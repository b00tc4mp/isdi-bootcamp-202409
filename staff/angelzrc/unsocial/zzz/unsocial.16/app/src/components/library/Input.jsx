import './Input.css'

export default ({ type, id, placeholder }) => {
    // console.log('Input -> render')

    return <input type={type} id={id} className="Input" placeholder={placeholder} />
}