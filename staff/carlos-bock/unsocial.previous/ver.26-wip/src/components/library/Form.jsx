import './Form.css'

const Form = ({children, onSubmit}) => {
    console.log('Form -> render')

    return <form className="Form" onSubmit={onSubmit}>{children}</form>
}

export default Form