import './Button.css'

export default ({ type, children, onClick }) => {
    console.log('Button -> render')

    return <button type={type} className="Button" onClick={onClick}>{children} </button>
}

