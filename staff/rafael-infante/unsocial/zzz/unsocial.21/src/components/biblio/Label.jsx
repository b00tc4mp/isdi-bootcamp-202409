import './Label.css'

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className='Label'>{children}</label>
  )
}

export default Label