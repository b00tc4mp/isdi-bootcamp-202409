import './Form.css'

function Form({ onSubmit, children }) {
  return (
    <form onSubmit={onSubmit} className='Form'>{children}</form>
  )
}

export default Form