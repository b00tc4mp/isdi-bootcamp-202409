import './Button.css'

function Button({ id, type, children, onClick }) {
  return (
    <button className='Button' id={id} type={type} onClick={onClick}>{children}</button>
  )
}

export default Button