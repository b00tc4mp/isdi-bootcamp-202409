import './Input.css'

function Input({ type, id, placeholder }) {
  return (
    <input className='Input' type={type} id={id} placeholder={placeholder} />
  )
}

export default Input