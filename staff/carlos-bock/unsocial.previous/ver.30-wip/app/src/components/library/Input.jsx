import './Input.css'

const Input = ({type, id}) => {
    console.log('Input -> render')
    return <input type={type} id={id} className="Input" />
}

export default Input